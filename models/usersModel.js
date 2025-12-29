import mongoose from "mongoose"
import { token } from "morgan";
import validator from 'validator'
import usersRoles from "../utils/roles.js";
const userSchema = new mongoose.Schema({
firstName :{
    type : String,
    required : true
},
lastName :{
    type : String,
    required : true
},
email :{
    type : String,
    unique:true,
    required : true,
    validate : [validator.isEmail , 'failed must e=be a valid email address']

},
password :{
    type : String,
    required : true
},
token:{
    type:String
},
role :{
type :String,
enum : [usersRoles.USER , usersRoles.ADMIN , usersRoles.MANAGER],
default : usersRoles.USER
},
avatar : {
    type : String,
     default : 'https://img.icons8.com/?size=100&id=23265&format=png&color=000000'
}


});

const User = mongoose.model("User" , userSchema) ;




export default User;

