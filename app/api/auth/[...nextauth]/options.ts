import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
export const option: NextAuthOptions = {
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, req) {
                const user = { id: "42", email: "ipxz@gmail.com", password: "123456", role: "manager" }
                if (credentials?.email === user.email && credentials?.password === user.password) {
                    console.log("suc");
                    
                    return user
                } else {
                    console.log("failed");
                    return null
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if(user) token.role = user.role
            return token
        },
        async session({ session, token }){
            if(session?.user) session.user.role = token.role
            return session
        }
    }
}