import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin, Globe, CheckCircle } from "lucide-react"

// This would normally fetch from database based on username
const getDeveloperByUsername = (username: string) => {
    const developers: Record<string, {
        name: string
        title: string
        bio: string
        isVerified: boolean
        skills: string[]
        github: string
        twitter: string
        linkedin: string
        website: string
        joinedAt: string
    }> = {
        "alexjohnson": {
            name: "Alex Johnson",
            title: "Senior Frontend Engineer",
            bio: "Passionate about building beautiful, performant web applications. 8+ years of experience with React, Next.js, and TypeScript. Active open source contributor.",
            isVerified: true,
            skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
            github: "alexjohnson",
            twitter: "alexjdev",
            linkedin: "alexjohnsondev",
            website: "https://alexjohnson.dev",
            joinedAt: "2024-01-15",
        },
        "sarahchen": {
            name: "Sarah Chen",
            title: "Backend Developer",
            bio: "Building robust APIs and scalable systems. Expertise in distributed systems and database optimization.",
            isVerified: true,
            skills: ["Python", "Go", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
            github: "sarahchen",
            twitter: "sarahchendev",
            linkedin: "sarahchendev",
            website: "",
            joinedAt: "2024-03-20",
        },
    }
    return developers[username] || null
}

interface DeveloperProfilePageProps {
    params: Promise<{ username: string }>
}

export default async function DeveloperProfilePage({ params }: DeveloperProfilePageProps) {
    const { username } = await params
    const developer = getDeveloperByUsername(username)

    if (!developer) {
        return (
            <div className="container py-24 mx-auto max-w-4xl px-4 text-center">
                <h1 className="text-2xl font-bold mb-4">Developer Not Found</h1>
                <p className="text-muted-foreground mb-6">This developer profile doesn&apos;t exist.</p>
                <Link href="/">
                    <Button>Back to Home</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-10 pb-10">
            {/* Profile Header */}
            <section className="container py-8 md:py-12 mx-auto max-w-4xl px-4">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                            <span className="text-4xl font-bold text-primary">
                                {developer.name.split(" ").map(n => n[0]).join("")}
                            </span>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold">{developer.name}</h1>
                            {developer.isVerified && (
                                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-sm">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>Verified</span>
                                </div>
                            )}
                        </div>
                        <p className="text-xl text-muted-foreground mb-4">{developer.title}</p>
                        <p className="text-muted-foreground mb-6">{developer.bio}</p>

                        {/* Social Links */}
                        <div className="flex flex-wrap gap-3">
                            {developer.github && (
                                <Link href={`https://github.com/${developer.github}`} target="_blank">
                                    <Button variant="outline" size="sm">
                                        <Github className="h-4 w-4 mr-2" />
                                        GitHub
                                    </Button>
                                </Link>
                            )}
                            {developer.twitter && (
                                <Link href={`https://twitter.com/${developer.twitter}`} target="_blank">
                                    <Button variant="outline" size="sm">
                                        <Twitter className="h-4 w-4 mr-2" />
                                        Twitter
                                    </Button>
                                </Link>
                            )}
                            {developer.linkedin && (
                                <Link href={`https://linkedin.com/in/${developer.linkedin}`} target="_blank">
                                    <Button variant="outline" size="sm">
                                        <Linkedin className="h-4 w-4 mr-2" />
                                        LinkedIn
                                    </Button>
                                </Link>
                            )}
                            {developer.website && (
                                <Link href={developer.website} target="_blank">
                                    <Button variant="outline" size="sm">
                                        <Globe className="h-4 w-4 mr-2" />
                                        Website
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="container mx-auto max-w-4xl px-4">
                <h2 className="text-xl font-semibold mb-4">Skills & Technologies</h2>
                <div className="flex flex-wrap gap-2">
                    {developer.skills.map((skill, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </section>

            {/* Member Info */}
            <section className="container mx-auto max-w-4xl px-4">
                <div className="rounded-lg border bg-card p-6">
                    <p className="text-sm text-muted-foreground">
                        Member since {new Date(developer.joinedAt).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric"
                        })}
                    </p>
                </div>
            </section>
        </div>
    )
}
