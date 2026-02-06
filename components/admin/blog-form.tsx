'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import Editor from "@/components/editor"
import { createPost, updatePost } from "@/app/actions/blog"
import { PostStatus } from "@prisma/client"

// Minimal type definition for Post to avoid importing full Prisma type if not needed or issues
interface PostData {
    id?: string
    title: string
    slug: string
    content: string
    status: PostStatus
}

export default function BlogPostForm({ post }: { post?: PostData }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState(post?.content || '')
    const [error, setError] = useState('')

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError('')

        const formData = new FormData(event.currentTarget)
        formData.set('content', content) // Add editor content manually

        try {
            let result;
            if (post?.id) {
                result = await updatePost(post.id, formData)
            } else {
                result = await createPost(formData)
            }

            if (result.error) {
                setError(result.error)
            } else {
                router.push('/admin/blog')
                router.refresh()
            }
        } catch (e) {
            setError("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input name="title" defaultValue={post?.title} required placeholder="Enter post title" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input name="slug" defaultValue={post?.slug} required placeholder="url-friendly-slug" />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Content</Label>
                <Editor content={content} onChange={setContent} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                        name="status"
                        id="status"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        defaultValue={post?.status || 'DRAFT'}
                    >
                        <option value="DRAFT">Draft</option>
                        <option value="PUBLISHED">Published</option>
                        <option value="REVIEW">Review</option>
                    </select>
                </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : (post?.id ? 'Update Post' : 'Create Post')}
                </Button>
            </div>
        </form>
    )
}
