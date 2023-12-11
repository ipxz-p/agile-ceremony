import { ZodError, z } from "zod";

const emailSchema = z.string().email({ message: 'Please enter a valid email address.' });
const usernameSchema = z.string().min(3, { message: "Username must be at least 3 characters." })
const passwordSchema = z.string().min(6, { message: 'Password must be at least 6 characters.' })
    .refine(
        (value) => /^(?=.*[a-z])/.test(value),
        { message: 'Password must include at least one lowercase letter.' }
    )
    .refine(
        (value) => /^(?=.*[A-Z])/.test(value),
        { message: 'Password must include at least one uppercase letter.' }
    )
    .refine(
        (value) => /^(?=.*\d)/.test(value),
        { message: 'Password must include at least one number.' }
    );
const validateField = (value: string, schema: any) => {
    try {
        schema.parse(value);
        return undefined; // Validation succeeded, clear the error
    } catch (error: any) {
        if (error instanceof ZodError) {
            // Extract all error messages from the ZodError
            const errorMessages = error.errors.map(err => err.message);
            return errorMessages;
        }
        // Handle non-ZodError exceptions
        return [error.message];
    }
};

export const validateEmail = (value: string) => validateField(value, emailSchema);
export const validateUsername = (value: string) => validateField(value, usernameSchema);
export const validatePassword = (value: string) => validateField(value, passwordSchema);