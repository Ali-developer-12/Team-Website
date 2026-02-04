"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsSubmitting(false)
        alert("Message sent! We'll get back to you soon.")
        setFormState({ name: "", email: "", subject: "", message: "" })
    }

    return (
        <div className="flex flex-col gap-10 pb-10">
            {/* Hero Section */}
            <section className="container py-8 md:py-12 lg:py-24 mx-auto max-w-7xl px-4 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                    Get in Touch
                </h1>
                <p className="mx-auto mt-6 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Have a project in mind or want to join our team? We&apos;d love to hear from you.
                </p>
            </section>

            {/* Contact Form and Info */}
            <section className="container px-4 mx-auto max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                            <p className="text-muted-foreground">
                                Reach out to us through any of the following channels or fill out the form.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-muted-foreground">hello@devorg.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Location</h3>
                                    <p className="text-muted-foreground">San Francisco, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="rounded-lg border bg-card p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Name
                                    </label>
                                    <Input
                                        id="name"
                                        placeholder="Your name"
                                        value={formState.name}
                                        onChange={(e) =>
                                            setFormState({ ...formState, name: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={formState.email}
                                        onChange={(e) =>
                                            setFormState({ ...formState, email: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium">
                                    Subject
                                </label>
                                <Input
                                    id="subject"
                                    placeholder="What's this about?"
                                    value={formState.subject}
                                    onChange={(e) =>
                                        setFormState({ ...formState, subject: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">
                                    Message
                                </label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell us about your project or inquiry..."
                                    rows={6}
                                    value={formState.message}
                                    onChange={(e) =>
                                        setFormState({ ...formState, message: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
