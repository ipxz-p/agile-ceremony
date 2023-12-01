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
        await User.create({
            username,
            email,
            password: hashPassword,
            role: ["member"]
        })
    } catch (error: any) {
        console.log(error);
        throw error;
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
        console.log(error);
        throw error;
    }

}