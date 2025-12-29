import jwt from 'jsonwebtoken'
import httpStatus from '../utils/httpStatus.js';
import appERROR from '../utils/appERROR.js';

const verifyToken = (req ,res , next) => {

 const authHeader = req.headers['Authorization'] || req.headers['authorization']
if(!authHeader){
         const error=  appERROR.create(' token is required', 401 , httpStatus.ERROR)
         return next(error);
}

const token = authHeader.split(' ')[1]

try{
  const currentUser = jwt.verify(token , process.env.JWT_SECRET_KEY )
           req.currentUser = currentUser;
  next();
} catch(err){
     const error=  appERROR.create('invalid token', 401 , httpStatus.ERROR)
         return next(error);
}

}
export default verifyToken