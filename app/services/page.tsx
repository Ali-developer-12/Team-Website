import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Monitor, Server, Shield } from "lucide-react"

export default function ServicesPage() {
    return (
        <div className="flex flex-col gap-10 pb-10">
            <section className="container py-8 md:py-12 lg:py-24 mx-auto max-w-7xl px-4 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    Our Services
                </h1>
                <p className="mx-auto mt-6 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    We deliver enterprise-grade solutions.
                </p>
            </section>

            <section className="container px-4 mx-auto max-w-7xl">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                        <Monitor className="h-10 w-10 mb-4 text-primary" />
                        <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">Web Application Development</h3>
                        <p className="text-sm text-muted-foreground">High-performance React & Next.js applications tailored to your business needs.</p>
                    </div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                        <Server className="h-10 w-10 mb-4 text-primary" />
                        <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">Backend & API Design</h3>
                        <p className="text-sm text-muted-foreground">Scalable REST and GraphQL APIs using Node.js, Python, or Go along with robust database design.</p>
                    </div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                        <Shield className="h-10 w-10 mb-4 text-primary" />
                        <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">DevOps & Security</h3>
                        <p className="text-sm text-muted-foreground">CI/CD pipelines, Cloud infrastructure (AWS/GCP), and security auditing.</p>
                    </div>
                </div>
            </section>

            <section className="container py-12 md:py-24 mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to start?</h2>
                <Link href="/contact">
                    <Button size="lg">Contact Us</Button>
                </Link>
            </section>
        </div>
    )
}
