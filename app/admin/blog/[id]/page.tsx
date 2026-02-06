import BlogPostForm from "@/components/admin/blog-form"
import { getPost } from "@/app/actions/blog"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params
    const post = await getPost(resolvedParams.id)

    if (!post) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
                <p className="text-muted-foreground">Make changes to "{post.title}".</p>
            </div>
            <Card>
                <CardContent className="pt-6">
                    <BlogPostForm post={post as any} />
                </CardContent>
            </Card>
        </div>
    )
}
