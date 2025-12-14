import {Request ,Response} from 'express';
import User from '../models/User';

export const register = async (req:Request, res:Response) => {
    try{
 const {email,password} = req.body;
    
    const user = await User.create({email,password});
    if(user.email == undefined || user.password == undefined){
        return res.status(400).json({message:"Email and Password are required"});
    } 

    res.status(201).json({
        id: user._id,
        email: user.email,
        role: user.role
    })
    }
    catch(error:any){

        if(error.code === 11000){
            return res.status(400).json({message:"Email already exists"});
        }
        return res.status(500).json({message:"Internal Server Error"});
    };
   
}