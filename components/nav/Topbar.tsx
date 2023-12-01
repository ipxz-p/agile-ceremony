import { option } from "@/app/api/auth/[...nextauth]/options";
import { cn } from "@/lib/utils";
import { Logout } from "@mui/icons-material";
import { getServerSession } from "next-auth";
import { Gloria_Hallelujah } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const gloria = Gloria_Hallelujah({ 
    subsets: ['latin'],
    weight: '400'
})
const Topbar = async () => {
    const session = await getServerSession(option)
    return (
        <nav className="topbar">
            <Link href="/">
                <p className={cn("", gloria.className)}>Agile Ceremony</p>
            </Link>
            {!!session && (
                <>
                    <p>{session.user?.role}</p>
                    <Logout />
                </>
            )}
            {!session && (
                <Link href="/login">
                <div className="hover:bg-myblue-500 hover:text-white transition px-2 py-1 rounded-md">
                    <p className="">Login</p>
                </div>
            </Link>
            )}
            
        </nav>
    );
}
export default Topbar;