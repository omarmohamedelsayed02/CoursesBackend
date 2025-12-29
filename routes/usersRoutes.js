import express from "express";
import { body } from 'express-validator';
import validationSchema from '../middleWares/validationSchema.js'
import usersController from '../controllers/users.js'
import verifyToken from "../middleWares/verifyToken.js";
import multer from "multer";
import appERROR from "../utils/appERROR.js";

const diskStorage = multer.diskStorage({
destination : function (req , file , cb) {
    console.log('file', file)
    cb(null , 'uploads')
},
filename :  function (req , file , cb) {
    const ext = file.mimetype.split('/')[1];
    const fileName = `user-${Date.now()}.${ext}`
    cb(null , fileName)
}
})

const fileFilter = (req,file,cb)=>{
    const imageType = file.mimetype.split('/')[0];
    if (imageType == 'image') {
       return cb(null ,true)
    } else {
        return cb (appERROR.create('check the type .. must be image' , 400 ),false)
    }
}
const upload = multer({storage : diskStorage ,
        fileFilter

 })
const router = express.Router();

//get all users always read data
//register
//login

router.route('/')
            .get(verifyToken ,usersController.getAllUsers)

router.route('/register')
            .post(upload.single('avatar'), usersController.register)

router.route('/login')
            .post(usersController.login)


;   
export default router;