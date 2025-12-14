import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }


        const hashedPassword = await bcrypt.hash(password, 10); // In production, hash the password before storing
        const user = await User.create({
            email,
            password: hashedPassword,
        });


        res.status(201).json({
            id: user._id,
            email: user.email,
            role: user.role
        })
    }
    catch (error: any) {

        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    };

}











export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({ email: email });


        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        )
        return res.status(200).json({ token });

    } catch (error: any) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

}