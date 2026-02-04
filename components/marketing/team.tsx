import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const teamMembers = [
    {
        name: "Abdul Rasheed Talal",
        role: "Full Stack Developer",
        bio: "Building modern web applications with React, Next.js, and TypeScript.",
        portfolio: "https://abdulrasheedtalal.netlify.app",
    },
    {
        name: "Ali Raza",
        role: "Frontend Developer • Project Manager • Co-Founder",
        bio: "Leading projects and crafting exceptional user interfaces.",
        portfolio: "https://ali-raza-dev.netlify.app",
    },
    {
        name: "Hammad Ali",
        role: "Frontend Developer",
        bio: "Creating responsive and interactive web experiences.",
        portfolio: "http://hammad-portfolionetlifyapp.netlify.app",
    },
    {
        name: "Imran",
        role: "Frontend Developer • QA Tester",
        bio: "Building interfaces and ensuring quality through thorough testing.",
        portfolio: "https://imrancit104-cmyk.github.io/My-protfolio-Latest",
    },
    {
        name: "Abdul Saboor",
        role: "Frontend Developer • UI/UX Designer",
        bio: "Designing beautiful interfaces with great user experience.",
        portfolio: "https://abdulsaboor-dev.netlify.app",
    },
    {
        name: "M. Arsalan",
        role: "Developer",
        bio: "Building robust and scalable web solutions.",
        portfolio: null,
    },
    {
        name: "Taimoor Shahzad",
        role: "Developer",
        bio: "Passionate about creating impactful digital products.",
        portfolio: null,
    },
    {
        name: "Adil Ali",
        role: "Developer",
        bio: "Crafting clean code and innovative solutions.",
        portfolio: null,
    },
]

export function Team() {
    return (
        <section className="container py-8 md:py-12 lg:py-24 mx-auto max-w-7xl px-4">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                    Meet the Team
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    We are a team of passionate developers building great software.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
                {teamMembers.map((member) => (
                    <div
                        key={member.name}
                        className="group flex flex-col items-center space-y-4 rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50"
                    >
                        {/* Avatar */}
                        <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <span className="text-2xl font-bold text-primary">
                                {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                            </span>
                        </div>

                        {/* Info */}
                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-bold">{member.name}</h3>
                            <p className="text-sm font-medium text-primary">{member.role}</p>
                            <p className="text-sm text-muted-foreground">{member.bio}</p>
                        </div>

                        {/* Portfolio Link */}
                        {member.portfolio ? (
                            <Link href={member.portfolio} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <ExternalLink className="h-4 w-4" />
                                    View Portfolio
                                </Button>
                            </Link>
                        ) : (
                            <Button variant="ghost" size="sm" disabled className="gap-2 opacity-50">
                                Coming Soon
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

