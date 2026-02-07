import { Skeleton } from "@/components/ui/skeleton"

export default function TeamLoading() {
    return (
        <div className="flex flex-col pb-10">
            {/* Hero Section Skeleton */}
            <section className="container py-8 md:py-12 lg:py-24 mx-auto max-w-7xl px-4 text-center">
                <Skeleton className="h-12 w-3/4 md:w-1/2 mx-auto mb-6" />
                <Skeleton className="h-6 w-full md:w-2/3 mx-auto" />
            </section>

            {/* Team Grid Skeleton */}
            <section className="container px-4 mx-auto max-w-7xl">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center space-y-4">
                            <Skeleton className="h-48 w-48 rounded-full" />
                            <div className="space-y-2 text-center w-full px-4">
                                <Skeleton className="h-6 w-3/4 mx-auto" />
                                <Skeleton className="h-4 w-1/2 mx-auto" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
