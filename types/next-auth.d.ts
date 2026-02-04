import { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            role: "ADMIN" | "EDITOR" | "AUTHOR" | "DEVELOPER" | "USER"
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        role: "ADMIN" | "EDITOR" | "AUTHOR" | "DEVELOPER" | "USER"
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string
        role: "ADMIN" | "EDITOR" | "AUTHOR" | "DEVELOPER" | "USER"
    }
}
