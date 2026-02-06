import { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            role: "ADMIN" | "EDITOR" | "AUTHOR" | "DEVELOPER" | "USER" | "SUPER_ADMIN" | "CONTENT_ADMIN" | "TEAM_ADMIN"
            isAdmin?: boolean
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        role: "ADMIN" | "EDITOR" | "AUTHOR" | "DEVELOPER" | "USER" | "SUPER_ADMIN" | "CONTENT_ADMIN" | "TEAM_ADMIN"
        isAdmin?: boolean
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string
        role: "ADMIN" | "EDITOR" | "AUTHOR" | "DEVELOPER" | "USER" | "SUPER_ADMIN" | "CONTENT_ADMIN" | "TEAM_ADMIN"
        isAdmin?: boolean
    }
}
