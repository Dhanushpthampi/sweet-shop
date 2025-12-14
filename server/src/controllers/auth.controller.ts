import {Request ,Response} from 'express';
import User from '../models/User';

export const register = async (req:Request, res:Response) => {
    
    const {email,password} = req.body;

    const user = new User({email,password});

    res.status(201).json({
        id: user._id,
        email: user.email,
        role: user.role
    })
}