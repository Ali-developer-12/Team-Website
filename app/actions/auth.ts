'use server'

import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export async function authenticateAdmin(prevState: string | undefined, formData: FormData) {
    try {
        await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirectTo: "/admin",
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials."
                default:
                    return "Something went wrong."
            }
        }
        // "Redirect" is thrown as an error in Next.js, we must rethrow it
        throw error
    }
}

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function registerAdmin(prevState: string | undefined, formData: FormData) {
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const email = formData.get("email") as string

    if (!username || !password || !email) {
        return "Missing fields."
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/
    if (!passwordRegex.test(password)) {
        return "Password must be at least 12 chars, incl. uppercase, lowercase, number, special char."
    }

    try {
        // Check if any admin exists
        const adminCount = await prisma.adminUser.count()
        const isFirstAdmin = adminCount === 0

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.adminUser.create({
            data: {
                username,
                email,
                passwordHash: hashedPassword,
                role: isFirstAdmin ? "SUPER_ADMIN" : "CONTENT_ADMIN",
                status: isFirstAdmin ? "ACTIVE" : "PENDING",
                isApproved: isFirstAdmin
            }
        })

        return isFirstAdmin
            ? "Account created & approved! You can now login."
            : "Account created. Waiting for approval."

    } catch (error) {
        console.error("Registration error:", error)
        return "Registration failed. Username or Email might be taken."
    }
}
