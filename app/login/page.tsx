"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate login
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)
        alert("Magic link sent! Check your email.")
    }

    const handleGitHubLogin = () => {
        // Would trigger OAuth flow
        alert("GitHub login would be triggered here")
    }

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
                    {/* Email Login */}
                    <form onSubmit={handleEmailLogin}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <Button disabled={isLoading}>
                                {isLoading ? "Sending..." : "Sign In with Email"}
                            </Button>
                        </div>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* GitHub Login */}
                    <Button variant="outline" onClick={handleGitHubLogin} disabled={isLoading}>
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                    </Button>
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
