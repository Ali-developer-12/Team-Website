import { Skeleton } from "@/components/ui/skeleton"

export default function JobsLoading() {
    return (
        <div className="flex flex-col gap-10 pb-10">
            {/* Hero Section Skeleton */}
            <section className="container py-8 md:py-12 lg:py-24 mx-auto max-w-7xl px-4 text-center">
                <Skeleton className="h-12 w-3/4 md:w-1/2 mx-auto mb-6" />
                <Skeleton className="h-6 w-full md:w-2/3 mx-auto" />
            </section>

            {/* Job Listings Skeleton */}
            <section className="container px-4 mx-auto max-w-4xl space-y-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-lg border bg-card p-6">
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                            <div className="space-y-3 flex-1">
                                <Skeleton className="h-5 w-20 rounded-full" />
                                <Skeleton className="h-7 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                                <div className="flex gap-4 pt-1">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                            <Skeleton className="h-10 w-28 md:self-start" />
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}
