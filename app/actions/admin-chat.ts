'use server'

import { prisma } from "@/lib/prisma"
import { verifyAdmin } from "@/lib/auth-admin"
import { revalidatePath } from "next/cache"

export async function getAdminMessages() {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    return await prisma.adminMessage.findMany({
        orderBy: { createdAt: 'asc' },
        take: 50
    })
}

export async function sendAdminMessage(content: string) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    if (!content.trim()) return { error: "Message cannot be empty" }

    try {
        await prisma.adminMessage.create({
            data: {
                content,
                senderEmail: admin.email
            }
        })

        const secretPath = process.env.SECRET_ADMIN_PATH || 'admin-$ecret-P@nel';
        revalidatePath(`/${secretPath}/chat`)
        return { success: true }
    } catch (error) {
        return { error: "Failed to send message" }
    }
}
