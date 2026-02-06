import NextAuth from "next-auth"
import authConfig from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma) as any,
    session: { strategy: "jwt" },
    ...authConfig,
    providers: [
        ...authConfig.providers,
        Credentials({
            name: "Admin Login",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: Partial<Record<string, unknown>>) {
                if (!credentials?.username || !credentials?.password) return null;

                const username = credentials.username as string;
                const password = credentials.password as string;

                const admin = await prisma.adminUser.findUnique({
                    where: { username }
                });

                if (!admin) return null;

                // Check lock status
                if (admin.lockedUntil && admin.lockedUntil > new Date()) {
                    throw new Error("Account locked. Try again later.");
                }

                // Check password
                const passwordsMatch = await bcrypt.compare(password, admin.passwordHash);

                if (!passwordsMatch) {
                    // Increment failed attempts
                    const attempts = admin.failedLoginAttempts + 1;
                    const lockData: any = { failedLoginAttempts: attempts };

                    if (attempts >= 5) {
                        lockData.lockedUntil = new Date(Date.now() + 60 * 60 * 1000); // 1 hour lock
                    }

                    await prisma.adminUser.update({
                        where: { id: admin.id },
                        data: lockData
                    });

                    console.log(`Failed login attempt for ${username}. Attempts: ${attempts}`);
                    return null;
                }

                if (admin.status !== "ACTIVE") {
                    throw new Error(`Account status: ${admin.status}`);
                }

                // Reset failed attempts on success
                await prisma.adminUser.update({
                    where: { id: admin.id },
                    data: {
                        failedLoginAttempts: 0,
                        lockedUntil: null
                    }
                });

                return {
                    id: admin.id,
                    name: admin.username,
                    email: admin.email,
                    role: admin.role, // This will be passed to jwt callback
                    isAdmin: true // Custom flag
                };
            }
        })
    ],
})
