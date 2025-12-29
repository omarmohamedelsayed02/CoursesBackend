import appERROR from "../utils/appERROR.js";

export default (...roles)=>{

return(req,res,next) =>{
    if  (!roles.includes(req.currentUser.role)){
               return next(appERROR.create('no able to this ' , 401 ))
    }
    next();

}

}