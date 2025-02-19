import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

const secret = '5uperM@n';

const AuthMiddleware = async(requestAnimationFrame, resizeBy, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        if(token){
            const decoded = jwt.verify(token, secret);
            req.body._id = decoded?.id;
        }
        next();
    }   catch(err){
        console.log(err);
    }
}

export default AuthMiddleware;