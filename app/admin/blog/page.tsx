import Link from "next/link"
import { getPosts, deletePost } from "@/app/actions/blog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge" // Need Badge
import { PlusCircle, Edit, Trash2 } from "lucide-react"

export default async function BlogAdminPage() {
    const posts = await getPosts()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
                    <p className="text-muted-foreground">Manage your articles and tutorials.</p>
                </div>
                <Link href="/admin/blog/new">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Post
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Posts</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground font-medium">
                                <tr>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Author</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {posts.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                            No posts found. Create one to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    posts.map((post) => (
                                        <tr key={post.id} className="hover:bg-muted/50 transition-colors">
                                            <td className="p-4 font-medium">{post.title}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${post.status === 'PUBLISHED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                        post.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                            'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {post.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {post.author?.name || 'Admin'}
                                            </td>
                                            <td className="p-4 text-muted-foreground">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/blog/${post.id}`}>
                                                        <Button size="sm" variant="outline">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <DeletePostButton id={post.id} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function DeletePostButton({ id }: { id: string }) {
    // This needs to be a client component or use a form with server action
    // Inline server action form for simplicity
    return (
        <form action={async () => {
            'use server'
            await deletePost(id)
        }}>
            <Button size="sm" variant="destructive" type="submit">
                <Trash2 className="h-4 w-4" />
            </Button>
        </form>
    )
}
