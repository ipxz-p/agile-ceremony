"use server"

import User from "../models/user.model";
import { connectDB } from "../mongoose";
import bcrypt from "bcrypt"

export const register = async (
    username: string,
    email: string,
    password: string
) => {
    try {
        await connectDB()
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.findOne({email}).exec()
        if(user){
            return { success: false, message: "Email already exists" };
        }
        await User.create({
            username,
            email,
            password: hashPassword,
            role: ["member"]
        })
        return { success: true, message: "Registration successful" };
    } catch (error: any) {
        return { success: false, message: error };
    }
}

export const login = async (
    email: string,
    password: string
) => {
    try {
        await connectDB()
        const user = await User.findOne({ email }).exec()
        if (!user) {
            throw Error("");
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            throw Error("");
        }
        return user
    } catch (error: any) {
        throw error;
    }
}