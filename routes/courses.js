import express from "express";
import coursesController from "../controllers/courses.js";
import { body } from 'express-validator';
import validationSchema from '../middleWares/validationSchema.js'
import verifyToken from "../middleWares/verifyToken.js";
import usersRoles from "../utils/roles.js";
import allowedTo from "../middleWares/allowedTo.js";
const router = express.Router();
//get all courses always read data
//route ==> resourse
router.route('/')
            .get(coursesController.getAllCourses)
            .post( verifyToken , allowedTo(usersRoles.MANAGER ) ,validationSchema(),coursesController.addNewCourse
   );


router.route('/:courseId')
        .get(coursesController.getSingleCourse)
        .patch(verifyToken , allowedTo(usersRoles.ADMIN, usersRoles.MANAGER ) ,coursesController.updateCourse)
        .delete(verifyToken , allowedTo(usersRoles.ADMIN, usersRoles.MANAGER ) ,coursesController.deleteCourse)
;   
export default router;