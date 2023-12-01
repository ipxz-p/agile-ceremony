"use client"

import { signOut } from "next-auth/react";

const Logout = () => {
    return (
        <div onClick={() => signOut()} className="hover:bg-myblue-500 hover:text-white transition px-2 py-1 rounded-md cursor-pointer">
            <p>Logout</p>
        </div>
    );
}

export default Logout;