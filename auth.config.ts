import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"

export default {
    providers: [
        GitHub,
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                // Logic to verify user
                return null
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.role = user.role
                if (user.id) {
                    token.id = user.id
                }
            }
            return token
        },
        session({ session, token }) {
            if (session.user && token.id) {
                session.user.id = token.id as string
                session.user.role = token.role as any
            }
            return session
        }
    }
} satisfies NextAuthConfig
