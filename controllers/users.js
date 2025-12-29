import asyncWrapper from "../middleWares/asyncWrapper.js";
import User from '../models/usersModel.js'
import httpStatus from "../utils/httpStatus.js";
import express from "express";
import appERROR from '../utils/appERROR.js';
import bcrypt from "bcryptjs";
import JWT from "../utils/generateJWT.js";



const app = express();
app.use(express.json()); 

const getAllUsers = asyncWrapper(
    
async (req, res) => {
    const query = req.query;
    const limit =query.limit || 10;
    const page = query.page || 1;
    const skip =( page -1 )*limit;
 const users = await User.find({},{"__v":false , "password" :false} ).limit(limit).skip(skip);
       res.json({status : httpStatus.SUCCESS , data: users})
});

const register = asyncWrapper(
    async(req,res , next) =>{
        const {firstName , lastName , email , password , role , avatar} =req.body;
     const OldUser = await User.findOne({email:email})
        if (OldUser) {
            const error = appERROR.create('user is already exists' , 400 , httpStatus.FAIL)
            return next(error)
        }
        //password hashing
    const hashedPass =   await bcrypt.hash(password , 10)


        const NewUser = new User({
            firstName ,
             lastName ,
              email ,
              password:hashedPass,
              role,
              avatar : req.file.filename

        })
        //generate JWT token
const token = await JWT({email : NewUser.email , id : NewUser._id , role : NewUser.role})
NewUser.token = token;


await NewUser.save()


      res.json({status : httpStatus.SUCCESS , data: {user:NewUser}})

})

const login = asyncWrapper(
    async(req,res,next) =>{

const {email , password} = req.body
if(!email && !password){
          const error = appERROR.create('email and password asr required' , 400 , httpStatus.FAIL)
            return next(error)
}
const user = await User.findOne({email :email});


if(!user){
    const error = appERROR.create('user not found' , 400 , httpStatus.FAIL)
    return next(error)
}

const compare = bcrypt.compare(password , user.password)

if(user && compare){
    //loggged in successfully
    const token =await JWT({email : user.email , id : user._id , role : user.role})

  return    res.json({status : httpStatus.SUCCESS , data:{token:token}})

}else {
                const error = appERROR.create('something wrong' , 500 , httpStatus.ERROR)
            return next(error)
}
})



export default {getAllUsers , register , login}
