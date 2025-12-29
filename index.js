// CRUD operations (Create, Read, Update, Delete)
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import coursesRoutes from './routes/courses.js';
import usersRoutes from './routes/usersRoutes.js'
import httpStatus from './utils/httpStatus.js';
import cors from 'cors';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error(err));

// Routes
app.use('/api/courses', coursesRoutes);
app.use('/api/users', usersRoutes);

app.use((error , req, res , next) => {
        return res.status(error.statusCode || 500).json({status : error.statusText || httpStatus.ERROR , message :error.message ,  code : error.statusCode || 500 , data :null})
});

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
