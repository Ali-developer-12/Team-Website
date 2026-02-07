'use server'

import { prisma } from "@/lib/prisma"
import { verifyAdmin } from "@/lib/auth-admin"
import { revalidatePath } from "next/cache"
import { PostStatus } from "@prisma/client"

export async function getPosts() {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    return await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: { adminAuthor: true, category: true }
    })
}

export async function getPost(id: string) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    return await prisma.post.findUnique({
        where: { id },
        include: { tags: true }
    })
}

export async function createPost(formData: FormData) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const content = formData.get("content") as string
    const status = formData.get("status") as PostStatus

    try {
        const post = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                status: status || 'DRAFT',
                adminAuthorId: admin.id,
            }
        })
        revalidatePath('/blog')
        return { success: true, post }
    } catch (error) {
        console.error("Create Post Error:", error)
        return { error: "Failed to create post." }
    }
}

export async function updatePost(id: string, formData: FormData) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const content = formData.get("content") as string
    const status = formData.get("status") as PostStatus

    try {
        await prisma.post.update({
            where: { id },
            data: {
                title,
                slug,
                content,
                status
            }
        })
        revalidatePath(`/blog/${slug}`)
        return { success: true }
    } catch (error) {
        return { error: "Failed to update post." }
    }
}

export async function deletePost(id: string) {
    const admin = await verifyAdmin()
    if (!admin) throw new Error("Unauthorized")

    try {
        await prisma.post.delete({ where: { id } })
        revalidatePath('/blog')
        return { success: true }
    } catch (error) {
        return { error: "Failed to delete post." }
    }
}
