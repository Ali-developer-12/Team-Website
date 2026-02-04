import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User } from "lucide-react"

// Placeholder blog posts (would come from database in production)
const blogPosts = [
    {
        id: "1",
        slug: "getting-started-with-nextjs-14",
        title: "Getting Started with Next.js 14",
        excerpt: "A comprehensive guide to building modern web applications with Next.js 14 and the new App Router.",
        author: "Alex Johnson",
        publishedAt: "2026-01-15",
        readTime: "8 min read",
        image: "/blog/nextjs.jpg",
    },
    {
        id: "2",
        slug: "building-scalable-apis-with-prisma",
        title: "Building Scalable APIs with Prisma",
        excerpt: "Learn how to design and implement robust database schemas using Prisma ORM for your Node.js applications.",
        author: "Sarah Chen",
        publishedAt: "2026-01-20",
        readTime: "12 min read",
        image: "/blog/prisma.jpg",
    },
    {
        id: "3",
        slug: "authentication-best-practices-2026",
        title: "Authentication Best Practices in 2026",
        excerpt: "Modern approaches to securing your applications, from JWTs to NextAuth and passkeys.",
        author: "Mike Williams",
        publishedAt: "2026-01-28",
        readTime: "10 min read",
        image: "/blog/auth.jpg",
    },
    {
        id: "4",
        slug: "typescript-advanced-patterns",
        title: "TypeScript Advanced Patterns",
        excerpt: "Explore advanced TypeScript patterns including generics, utility types, and type guards.",
        author: "Emily Davis",
        publishedAt: "2026-02-01",
        readTime: "15 min read",
        image: "/blog/typescript.jpg",
    },
]

export default function BlogPage() {
    return (
        <div className="flex flex-col gap-10 pb-10">
            {/* Hero Section */}
            <section className="container py-8 md:py-12 lg:py-24 mx-auto max-w-7xl px-4 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                    Our Blog
                </h1>
                <p className="mx-auto mt-6 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Insights, tutorials, and best practices from our team of verified developers.
                </p>
            </section>

            {/* Blog Posts Grid */}
            <section className="container px-4 mx-auto max-w-7xl">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.map((post) => (
                        <article
                            key={post.id}
                            className="group rounded-lg border bg-card overflow-hidden transition-all hover:shadow-lg"
                        >
                            {/* Image Placeholder */}
                            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                <span className="text-2xl font-bold text-primary/30">DevOrg</span>
                            </div>

                            <div className="p-6">
                                <Link href={`/blog/${post.slug}`}>
                                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>
                                </Link>
                                <p className="text-muted-foreground mb-4 line-clamp-2">
                                    {post.excerpt}
                                </p>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>{post.publishedAt}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container py-12 md:py-24 mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Want to contribute?</h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                    If you&apos;re a verified developer, you can share your knowledge with our community.
                </p>
                <Link href="/join">
                    <Button size="lg">Become a Contributor</Button>
                </Link>
            </section>
        </div>
    )
}
