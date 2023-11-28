import jwt from 'jsonwebtoken';
import { getuserdetails } from '../controller/usercontrol.js';


//custom middleware

const isAuth =async(req ,res, next)=>{
    let token;
    if(req.header){
        try {
            token = req.headers["x-auth-token"];
            const decode =jwt.verify(token,process.env.SecretKey); 
            console.log(decode);
            req.user = await getuserdetails(decode.id);
            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({error: "Internal Server Error in auth"})
        }
    }

}

export {isAuth};