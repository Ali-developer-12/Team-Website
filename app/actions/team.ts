'use server'

import { prisma } from "@/lib/prisma"
import { verifyAdmin } from "@/lib/auth-admin"
import { revalidatePath } from "next/cache"

export async function getTeamMembers() {
    return await prisma.user.findMany({
        where: {
            role: 'DEVELOPER'
        },
        include: {
            profile: true
        },
        orderBy: {
            profile: {
                displayOrder: 'asc'
            }
        }
    })
}

export async function getTeamMember(id: string) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    return await prisma.user.findUnique({
        where: { id },
        include: { profile: true }
    })
}

export async function createTeamMember(formData: FormData) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const role = formData.get("role") as string
    const bio = formData.get("bio") as string
    const skills = (formData.get("skills") as string || "").split(',').map(s => s.trim())

    try {
        await prisma.user.create({
            data: {
                name,
                email: email || `${Date.now()}@temp.com`,
                role: 'DEVELOPER',
                profile: {
                    create: {
                        title: role,
                        bio,
                        skills
                    }
                }
            }
        })
        revalidatePath('/team')
        return { success: true }
    } catch (error) {
        return { error: "Failed to create team member." }
    }
}

export async function updateTeamMember(id: string, formData: FormData) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    const name = formData.get("name") as string
    const title = formData.get("title") as string
    const bio = formData.get("bio") as string
    const skills = (formData.get("skills") as string || "").split(',').map(s => s.trim())

    try {
        await prisma.user.update({
            where: { id },
            data: {
                name,
                profile: {
                    update: {
                        title,
                        bio,
                        skills
                    }
                }
            }
        })
        revalidatePath('/team')
        return { success: true }
    } catch (error) {
        return { error: "Failed to update team member." }
    }
}

export async function deleteTeamMember(id: string) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    try {
        await prisma.user.delete({ where: { id } })
        revalidatePath('/team')
        return { success: true }
    } catch (error) {
        return { error: "Failed to delete team member." }
    }
}

export async function updateTeamOrder(items: { id: string, order: number }[]) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    try {
        await prisma.$transaction(
            items.map(item =>
                prisma.profile.update({
                    where: { userId: item.id },
                    data: { displayOrder: item.order }
                })
            )
        )
        revalidatePath('/team')
        return { success: true }
    } catch (error) {
        return { error: "Failed to reorder." }
    }
}
