"use client"
import { validateEmail, validatePassword, validateUsername } from "@/lib/validations/validateAuthForm";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/lib/actions/user.action";
const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState<string[] | undefined>(undefined);
    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState<string[] | undefined>(undefined);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState<string[] | undefined>(undefined)
    const [showPassword, setShowPassword] = useState(false);
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const UsernameValue = e.target.value
        setUsernameError(validateUsername(UsernameValue));
        setUsername(UsernameValue);
    }
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
    let isFormValid = !emailError && !passwordError && username !== "" && email !== "" && password !== "";
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            router.push('/login');
        } catch (error) {
            alert(error);
        }
    }
    return (
        <form onSubmit={handleSubmit} className="flex-shrink-0 w-[400px] flex flex-col justify-center items-center h-screen px-8">
            <p className="text-2xl font-medium mb-6">Create your account</p>
            <TextField
                className="w-full"
                id="outlined-basic"
                label="Username"
                variant="outlined"
                size="small"
                onChange={handleUsernameChange}
                error={!!usernameError}
                helperText={usernameError}
                required
                name="username"
                
            />
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
                sx={{
                    marginTop: 2
                }}
            />
            <TextField
                className="w-full"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                size="small"
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={
                    passwordError && 
                    passwordError?.map((error, index) => <div key={index}>{error}</div>)
                }
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
                    marginBottom: 3,
                    paddingX: 3,
                    backgroundColor: isFormValid ? "#00B4D8 !important" : undefined,
                    alignSelf: 'flex-end',
                    "&:disabled": {
                        cursor: "not-allowed",
                        pointerEvents: "all !important",
                    },
                }}
            >
                Login
            </Button>
            <div className="flex">
                <p>Have an account?</p>
                <Link className="ml-2 text-myblue-600" href="/login">Log in</Link>
            </div>
        </form>
    );
}

export default RegisterForm;