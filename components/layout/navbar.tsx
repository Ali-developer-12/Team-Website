"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Menu, X } from "lucide-react"

const navLinks = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Jobs", href: "/jobs" },
    { name: "Contact", href: "/contact" },
]

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center max-w-7xl mx-auto px-4">
                {/* Logo */}
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        DevOrg
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-1">
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="transition-colors hover:text-foreground text-foreground/60"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right side actions */}
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <ThemeToggle />
                    <div className="hidden md:flex items-center space-x-2">
                        <Link href="/login">
                            <Button variant="ghost" size="sm">Login</Button>
                        </Link>
                        <Link href="/join">
                            <Button size="sm">Join Us</Button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t bg-background">
                    <div className="container max-w-7xl mx-auto px-4 py-4 space-y-4">
                        <nav className="flex flex-col space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium transition-colors hover:text-foreground text-foreground/60 py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex flex-col space-y-2 pt-4 border-t">
                            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start">Login</Button>
                            </Link>
                            <Link href="/join" onClick={() => setMobileMenuOpen(false)}>
                                <Button className="w-full">Join Us</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
