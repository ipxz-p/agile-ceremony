import NextAuth from "next-auth/next";
import { option } from "./options";

const handler = NextAuth(option)
export { handler as GET, handler as POST }