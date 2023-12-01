import { z } from "zod";

const emailSchema = z.string().email({ message: 'Please enter a valid email address' });
const passwordSchema = z.string().min(6, { message: 'Password must be at least 6 characters long' });
const validateField = (value: string, schema: any) => {
    try {
        schema.parse(value);
        return undefined; // Validation succeeded, clear the error
    } catch (error: any) {
        const parsedError = JSON.parse(error.message);
        return parsedError[0].message; // Validation failed, return the error message
    }
};

export const validateEmail = (value: string) => validateField(value, emailSchema);
export const validatePassword = (value: string) => validateField(value, passwordSchema);