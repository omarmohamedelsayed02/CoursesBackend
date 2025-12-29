import { validationResult } from 'express-validator';
import express from 'express';
import Course from "../models/courseSchema.js";
import httpStatus from "../utils/httpStatus.js"
import asyncWrapper from '../middleWares/asyncWrapper.js';
import appERROR from '../utils/appERROR.js';
const app = express();


app.use(express.json()); 

const getAllCourses = asyncWrapper(
    async (req, res) => {
     const query = req.query;
     const limit =query.limit || 10;
     const page = query.page || 1;
     const skip =( page -1 )*limit;
  const courses = await Course.find( {} , {"__v":false} ).limit(limit).skip(skip);
        res.json({status : httpStatus.SUCCESS , data: {course :courses}})
 }
)
 

const getSingleCourse = asyncWrapper(
async (req, res , next ) => {
const course = await Course.findById(req.params.courseId);
    if(!course) {
     const error =  appERROR.create('not found' , 404 , httpStatus.FAIL)
        return next(error)
                 }
   return res.json({status : httpStatus.SUCCESS , data: {course :course}})
} 
);

const addNewCourse =  asyncWrapper(
    async  (req, res , next)=>
          {
const errors = validationResult(req);
if(!errors.isEmpty()){
   const error=  appERROR.create(errors.array(), 400 , httpStatus.FAIL)
     return next(error);
}
const newCourse = new Course(req.body);
await newCourse.save();
res.status(201).json({status : httpStatus.SUCCESS , data: {course :newCourse}})

}
);

const updateCourse =asyncWrapper(
    async (req, res , next)=>{
        const CourseId = req.params.courseId ;  
            const  update = await Course.updateOne({_id:CourseId},{$set: {...req.body}} )
            return res.status(201).json({status : httpStatus.SUCCESS , data: {course :update}})
    }
)
const deleteCourse = asyncWrapper(
    async (req, res,next)=>{
    const CourseId = req.params.courseId ;
        const deleteOne = await Course.deleteOne({_id :CourseId})
        return res.status(200).json({status : httpStatus.SUCCESS , data: {course :deleteOne}})
})

export default {updateCourse , deleteCourse , addNewCourse , getAllCourses , getSingleCourse};