import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export default {
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true,
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
                // @ts-ignore
                if (user.isAdmin) {
                    token.isAdmin = true
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
                    session.user.role = token.role as "ADMIN" | "EDITOR" | "AUTHOR" | "DEVELOPER" | "USER" | "SUPER_ADMIN" | "CONTENT_ADMIN" | "TEAM_ADMIN"
                }
                if (token.isAdmin) {
                    // @ts-ignore
                    session.user.isAdmin = token.isAdmin as boolean
                }
            }
            return session
        }
    }
} satisfies NextAuthConfig

