import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react"

// This would normally fetch from database based on slug
const getPostBySlug = (slug: string) => {
    const posts: Record<string, {
        title: string
        content: string
        author: string
        authorBio: string
        publishedAt: string
        readTime: string
    }> = {
        "getting-started-with-nextjs-14": {
            title: "Getting Started with Next.js 14",
            content: `
## Introduction

Next.js 14 introduces several groundbreaking features that make building modern web applications easier than ever. In this comprehensive guide, we'll explore the new App Router, Server Components, and more.

## The App Router

The App Router is a new paradigm for building Next.js applications. It uses React Server Components by default, providing a more intuitive way to build layouts and pages.

### Key Features

- **Server Components**: Components render on the server by default, reducing client-side JavaScript
- **Streaming**: Content is streamed to the client as it becomes available
- **Nested Layouts**: Create persistent layouts that don't re-render

## Getting Started

First, create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

Then, navigate to your project and start the development server:

\`\`\`bash
cd my-app
npm run dev
\`\`\`

## Conclusion

Next.js 14 represents a significant step forward in web development. By embracing server components and the new app router, you can build faster, more scalable applications.
            `,
            author: "Alex Johnson",
            authorBio: "Senior Developer at DevOrg",
            publishedAt: "2026-01-15",
            readTime: "8 min read",
        },
    }
    return posts[slug] || null
}

interface BlogPostPageProps {
    params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) {
        return (
            <div className="container py-24 mx-auto max-w-4xl px-4 text-center">
                <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
                <p className="text-muted-foreground mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
                <Link href="/blog">
                    <Button>Back to Blog</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-10 pb-10">
            {/* Back Link */}
            <div className="container pt-8 mx-auto max-w-4xl px-4">
                <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                </Link>
            </div>

            {/* Article Header */}
            <article className="container mx-auto max-w-4xl px-4">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium text-foreground">{post.author}</p>
                                <p className="text-xs">{post.authorBio}</p>
                            </div>
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

                    {/* Featured Image Placeholder */}
                    <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-8">
                        <span className="text-4xl font-bold text-primary/30">DevOrg</span>
                    </div>
                </header>

                {/* Article Content */}
                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <div className="whitespace-pre-line">{post.content}</div>
                </div>

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t">
                    <div className="flex items-center justify-between">
                        <p className="font-medium">Found this helpful?</p>
                        <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                        </Button>
                    </div>
                </div>
            </article>

            {/* CTA */}
            <section className="container py-12 mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Want more insights?</h2>
                <Link href="/blog">
                    <Button>Read More Articles</Button>
                </Link>
            </section>
        </div>
    )
}
