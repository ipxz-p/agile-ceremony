import Image from "next/image";
import RegisterForm from "./RegisterForm";

const LoginPage = () => {
    
    return (
        <div className="flex">
            <div className="w-full bg-myblue-200 flex justify-center items-center">
                <Image src="/asset/img/285-Discussion.svg" alt="Example SVG" width={400} height={400} priority />
            </div>
            <RegisterForm />
        </div>
    );
}

export default LoginPage;