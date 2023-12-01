"use client"
import { validateEmail, validatePassword } from "@/lib/validations/validateAuthForm";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Margin } from "@mui/icons-material";
import { useRouter } from "next/navigation";
const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState<string | undefined>(undefined)
    const [showPassword, setShowPassword] = useState(false);
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = e.target.value
        setEmailError(validateEmail(emailValue));
        setEmail(emailValue);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = e.target.value
        setPasswordError(validatePassword(passwordValue));
        setPassword(passwordValue);
    }
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    let isFormValid = !emailError && !passwordError;
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const credentials = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };
        const res = await signIn('credentials', {
            redirect: false, // or provide your redirect options
            ...credentials,
        });
        // Handle the response as needed
        if (!res?.error) {
            router.push('/');
            router.refresh();
        }
    }
    return (
        <form onSubmit={handleSubmit} className="flex-shrink-0 w-[400px] flex flex-col justify-center items-center h-screen px-8">
            <p className="text-2xl font-medium mb-6">Login to your account</p>
            <TextField
                className="w-full"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                size="small"
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
                required
                name="email"
            />
            <TextField
                className="w-full"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                size="small"
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
                required
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                name="password"
                sx={{
                    marginTop: 2
                }}
            />
            <Button

                type="submit"
                variant="contained"
                disabled={!isFormValid}
                sx={{
                    marginTop: 3,
                    paddingX: 3,
                    backgroundColor: isFormValid ? "#00B4D8 !important" : undefined,
                    alignSelf: 'flex-end'
                }}
            >
                Login
            </Button>
        </form>
    );
}

export default LoginForm;