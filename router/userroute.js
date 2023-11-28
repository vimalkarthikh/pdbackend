import express, { Router } from 'express';
import bcrypt from 'bcrypt';
import { forgotPassword, generateToken, getUserMail, resetPassword } from '../controller/usercontrol.js';
import { User } from '../models/user.js';

const route = express.Router();

//login
route.post('/login', async(req,res)=>{
    try {
        //check exists
        const user =await getUserMail(req);
        if(!user){return res.status(400).json({error:'User Not Found Authorization'});}
        //check psw
        const validpsw=await bcrypt.compare(req.body.password, user.password);
        if(!validpsw){return res.status(400).json({error:'Invalid User Authorization'});}
        //generate token
        const token=generateToken(user._id);
        res.status(200).json({message:'login successful', token})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'});         
    }
});


//register
route.post('/register',async(req,res)=>{
    try {
        //check user exists
        let user =await getUserMail(req);
        if(user){
            return res.status(400).json({error:'User already exists'});
        }
        //generate acc
        const salt = await bcrypt.genSalt(10);
        const hashpsw = await bcrypt.hash(req.body.password, salt);

        user = await new User({
            ...req.body,password:hashpsw
        }).save();
        //token generation
        const token =generateToken(user._id);
        res.status(201).json({message:'Register Successful',token})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
});


route.post('/forgotpassword', forgotPassword);
route.post('/reset/:token', resetPassword);

export const userRouter = route;