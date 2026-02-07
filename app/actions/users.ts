'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { verifyAdmin } from "@/lib/auth-admin"

// Admin Management
export async function getAdminUsers() {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    return await prisma.approvedAdmin.findMany({
        orderBy: { createdAt: 'desc' },
    })
}

export async function getPendingRequests() {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    return await prisma.pendingRequest.findMany({
        orderBy: { requestedAt: 'desc' },
    })
}

export async function approveAdmin(email: string) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    try {
        await prisma.approvedAdmin.create({
            data: {
                email,
                approvedBy: admin.email
            }
        })

        await prisma.pendingRequest.delete({
            where: { email }
        })

        const secretPath = process.env.SECRET_ADMIN_PATH || 'admin-$ecret-P@nel';
        revalidatePath(`/${secretPath}/dashboard`)
        return { success: true }
    } catch (error) {
        return { error: "Failed to approve admin." }
    }
}

export async function deleteAdmin(email: string) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    try {
        await prisma.approvedAdmin.delete({ where: { email } })
        const secretPath = process.env.SECRET_ADMIN_PATH || 'admin-$ecret-P@nel';
        revalidatePath(`/${secretPath}/dashboard`)
        return { success: true }
    } catch (error) {
        return { error: "Failed to delete admin." }
    }
}

// Website User Management
export async function getWebsiteUsers() {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    return await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { posts: true, applications: true } } }
    })
}
