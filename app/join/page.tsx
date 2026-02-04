"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, CheckCircle } from "lucide-react"

export default function JoinPage() {
    const [step, setStep] = useState(1)
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        github: "",
        bio: "",
        portfolio: "",
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate submission
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)
        setStep(3) // Success state
    }

    const handleGitHubSignup = () => {
        // Would trigger OAuth flow
        setStep(2)
    }

    if (step === 3) {
        return (
            <div className="container flex h-[calc(100vh-3.5rem)] w-full flex-col items-center justify-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] text-center">
                    <div className="flex justify-center">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <CheckCircle className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Application Submitted!
                    </h1>
                    <p className="text-muted-foreground">
                        Thank you for your interest in joining DevOrg. Our team will review your application and get back to you within 48 hours.
                    </p>
                    <Link href="/">
                        <Button>Back to Home</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container flex min-h-[calc(100vh-3.5rem)] w-full flex-col items-center justify-center py-10">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Join Our Developer Community
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Apply to become a verified developer on our platform
                    </p>
                </div>

                {step === 1 && (
                    <div className="grid gap-6">
                        <Button variant="outline" size="lg" onClick={handleGitHubSignup} className="h-12">
                            <Github className="mr-2 h-5 w-5" />
                            Continue with GitHub
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    We prefer GitHub for verification
                                </span>
                            </div>
                        </div>

                        <Button variant="ghost" onClick={() => setStep(2)}>
                            Continue with Email Instead
                        </Button>
                    </div>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    Full Name
                                </label>
                                <Input
                                    id="name"
                                    placeholder="Your full name"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="github" className="text-sm font-medium">
                                    GitHub Username
                                </label>
                                <Input
                                    id="github"
                                    placeholder="yourusername"
                                    value={formState.github}
                                    onChange={(e) => setFormState({ ...formState, github: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="portfolio" className="text-sm font-medium">
                                    Portfolio URL (optional)
                                </label>
                                <Input
                                    id="portfolio"
                                    placeholder="https://yourportfolio.com"
                                    value={formState.portfolio}
                                    onChange={(e) => setFormState({ ...formState, portfolio: e.target.value })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="bio" className="text-sm font-medium">
                                    Tell us about yourself
                                </label>
                                <Textarea
                                    id="bio"
                                    placeholder="Your experience, skills, and what you're looking for..."
                                    rows={4}
                                    value={formState.bio}
                                    onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                                    required
                                />
                            </div>

                            <Button type="submit" disabled={isLoading} className="mt-2">
                                {isLoading ? "Submitting..." : "Submit Application"}
                            </Button>

                            <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                                Back
                            </Button>
                        </div>
                    </form>
                )}

                <p className="px-8 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}
