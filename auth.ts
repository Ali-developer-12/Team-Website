import NextAuth from "next-auth"
import authConfig from "./auth.config"

// Note: When database is set up, uncomment the following lines:
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
// const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
    // adapter: PrismaAdapter(prisma), // Enable when database is configured
    session: { strategy: "jwt" },
    ...authConfig,
})
