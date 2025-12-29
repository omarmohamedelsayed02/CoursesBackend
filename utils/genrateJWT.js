import jwt from 'jsonwebtoken'

const JWT =  async (paylod) =>{

const token = await jwt.sign(
    paylod, 
    process.env.JWT_SECRET_KEY ,
     {expiresIn : "5m"}
    );

    return token;
}
export default JWT;