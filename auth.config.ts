import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"

export default {
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
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
            if (session.user) {
                if (token.id) {
                    session.user.id = token.id as string
                }
                if (token.role) {
                    session.user.role = token.role as "ADMIN" | "EDITOR" | "AUTHOR" | "DEVELOPER" | "USER"
                }
            }
            return session
        }
    }
} satisfies NextAuthConfig

