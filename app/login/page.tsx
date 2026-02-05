import Link from "next/link"
import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="container flex h-[calc(100vh-3.5rem)] w-full flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Sign in to your account to continue
                    </p>
                </div>

                <div className="grid gap-6">
                    {/* GitHub Login */}
                    <form
                        action={async () => {
                            "use server"
                            await signIn("github", { redirectTo: "/" })
                        }}
                    >
                        <Button type="submit" className="w-full" size="lg">
                            <Github className="mr-2 h-5 w-5" />
                            Sign in with GitHub
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Verified developers only
                            </span>
                        </div>
                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                        We use GitHub to verify your identity and developer credentials.
                    </p>
                </div>

                <p className="px-8 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/join"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Join Us
                    </Link>
                </p>
            </div>
        </div>
    )
}

