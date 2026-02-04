import { Team } from "@/components/marketing/team"

export default function AboutPage() {
    return (
        <div className="flex flex-col gap-10 pb-10">
            <section className="container py-8 md:py-12 lg:py-24 mx-auto max-w-7xl px-4 text-center md:text-left">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    About Our Organization
                </h1>
                <p className="mx-auto md:mx-0 mt-6 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    We were founded on the principle that code quality matters. Our mission is to elevate the standard of software engineering by verifying and gathering the best talent in the industry.
                </p>
            </section>
            <Team />
        </div>
    )
}
