'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { PostStatus, Prisma } from "@prisma/client"

export async function getPosts() {
    const session = await auth()
    if (!session?.user?.isAdmin) throw new Error("Unauthorized")

    return await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: { author: true, category: true }
    })
}

export async function getPost(id: string) {
    const session = await auth()
    if (!session?.user?.isAdmin) throw new Error("Unauthorized")

    return await prisma.post.findUnique({
        where: { id },
        include: { tags: true }
    })
}

export async function createPost(formData: FormData) {
    const session = await auth()
    if (!session?.user?.isAdmin) throw new Error("Unauthorized")

    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const content = formData.get("content") as string // HTML content
    const status = formData.get("status") as PostStatus

    // Create Post Logic
    try {
        const post = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                status: status || 'DRAFT',
                adminAuthorId: session.user.id,
                // authorId is optional now, we skip it
            }
        })
        revalidatePath('/admin/blog')
        return { success: true, post }
    } catch (error) {
        console.error("Create Post Error:", error)
        return { error: "Failed to create post. Slug must be unique." }
    }
}

export async function updatePost(id: string, formData: FormData) {
    const session = await auth()
    if (!session?.user?.isAdmin) throw new Error("Unauthorized")

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
        revalidatePath('/admin/blog')
        revalidatePath(`/blog/${slug}`) // Revalidate public path if exists
        return { success: true }
    } catch (error) {
        return { error: "Failed to update post." }
    }
}

export async function deletePost(id: string) {
    const session = await auth()
    if (!session?.user?.isAdmin) throw new Error("Unauthorized")

    try {
        await prisma.post.delete({ where: { id } })
        revalidatePath('/admin/blog')
        return { success: true }
    } catch (error) {
        return { error: "Failed to delete post." }
    }
}
