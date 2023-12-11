import Image from "next/image";
import LoginForm from "./LoginForm";

const LoginPage = () => {
    
    return (
        <div className="flex">
            <LoginForm />
            <div className="w-full bg-myblue-200 flex justify-center items-center">
                <Image src="/asset/img/123-Collaboration.svg" alt="Example SVG" width={400} height={400} priority />
            </div>
        </div>
    );
}

export default LoginPage;