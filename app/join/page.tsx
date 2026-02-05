import Link from "next/link"
import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { Github, CheckCircle, Code, Users, Briefcase } from "lucide-react"

const benefits = [
    {
        icon: Code,
        title: "Showcase Your Work",
        description: "Display your projects and contributions to the developer community"
    },
    {
        icon: Users,
        title: "Join Our Network",
        description: "Connect with other verified developers and collaborate on projects"
    },
    {
        icon: Briefcase,
        title: "Access Opportunities",
        description: "Get access to job opportunities and freelance projects"
    }
]

export default function JoinPage() {
    return (
        <div className="container flex min-h-[calc(100vh-3.5rem)] w-full flex-col items-center justify-center py-16 px-4">
            <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[450px]">
                {/* Header */}
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Join DevOrg
                    </h1>
                    <p className="text-muted-foreground">
                        Become a verified developer and join our community
                    </p>
                </div>

                {/* Benefits */}
                <div className="grid gap-4">
                    {benefits.map((benefit) => (
                        <div key={benefit.title} className="flex items-start space-x-3 rounded-lg border p-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <benefit.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-medium">{benefit.title}</h3>
                                <p className="text-sm text-muted-foreground">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sign Up Button */}
                <div className="grid gap-4">
                    <form
                        action={async () => {
                            "use server"
                            await signIn("github", { redirectTo: "/" })
                        }}
                    >
                        <Button type="submit" size="lg" className="w-full h-12 text-base">
                            <Github className="mr-2 h-5 w-5" />
                            Sign up with GitHub
                        </Button>
                    </form>

                    <p className="text-center text-xs text-muted-foreground">
                        By signing up, you agree to our{" "}
                        <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link>
                        {" "}and{" "}
                        <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>
                    </p>
                </div>

                {/* What we verify */}
                <div className="rounded-lg bg-muted/50 p-4 space-y-2">
                    <h3 className="font-medium text-sm">What we verify:</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                        <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Your GitHub profile and contributions
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Public repositories and code quality
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Professional background and experience
                        </li>
                    </ul>
                </div>

                {/* Login link */}
                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium underline underline-offset-4 hover:text-primary"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

