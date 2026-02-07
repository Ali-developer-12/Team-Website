import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
    return (
        <div className="flex flex-col gap-10 pb-10">
            {/* Hero Section Skeleton */}
            <section className="container py-8 md:py-12 lg:py-24 mx-auto max-w-7xl px-4 text-center">
                <Skeleton className="h-12 w-3/4 md:w-1/2 mx-auto mb-6" />
                <Skeleton className="h-6 w-full md:w-2/3 mx-auto" />
            </section>

            {/* Blog Posts Grid Skeleton */}
            <section className="container px-4 mx-auto max-w-7xl">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="rounded-lg border bg-card overflow-hidden">
                            <Skeleton className="aspect-video w-full" />
                            <div className="p-6 space-y-4">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                                <div className="flex gap-4 pt-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
