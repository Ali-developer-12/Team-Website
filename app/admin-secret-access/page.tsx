'use client'

import { useActionState } from 'react'
import { authenticateAdmin, registerAdmin } from '@/app/actions/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle } from "lucide-react"

function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(authenticateAdmin, undefined)

    return (
        <form action={formAction} className="space-y-4 pt-4">
            <div className="space-y-2">
                <Label htmlFor="login-username">Username</Label>
                <Input id="login-username" name="username" placeholder="Enter username" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" name="password" type="password" placeholder="••••••••••••" required />
            </div>
            {errorMessage && (
                <div className="flex items-center space-x-2 text-red-500 text-sm p-2 bg-red-50 dark:bg-red-900/10 rounded">
                    <AlertCircle className="h-4 w-4" />
                    <p>{errorMessage}</p>
                </div>
            )}
            <Button className="w-full" type="submit" disabled={isPending}>
                {isPending ? 'Authenticating...' : 'Sign In'}
            </Button>
        </form>
    )
}

function RegisterForm() {
    const [message, formAction, isPending] = useActionState(registerAdmin, undefined)
    const isSuccess = message?.includes("Account created")

    return (
        <form action={formAction} className="space-y-4 pt-4">
            <div className="space-y-2">
                <Label htmlFor="reg-username">Username</Label>
                <Input id="reg-username" name="username" placeholder="Choose a username" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input id="reg-email" name="email" type="email" placeholder="admin@example.com" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <Input
                    id="reg-password"
                    name="password"
                    type="password"
                    placeholder="Min 12 chars, Upper, Lower, Number"
                    required
                    minLength={12}
                />
                <p className="text-[0.8rem] text-muted-foreground">
                    Must be at least 12 characters, including uppercase, lowercase, numbers, and special characters.
                </p>
            </div>

            {message && (
                <div className={`flex items-start space-x-2 text-sm p-2 rounded ${isSuccess ? 'text-green-600 bg-green-50 dark:bg-green-900/10' : 'text-red-500 bg-red-50 dark:bg-red-900/10'}`}>
                    {isSuccess ? <CheckCircle className="h-4 w-4 mt-0.5" /> : <AlertCircle className="h-4 w-4 mt-0.5" />}
                    <p>{message}</p>
                </div>
            )}

            <Button className="w-full" type="submit" disabled={isPending}>
                {isPending ? 'Registering...' : 'Register as Admin'}
            </Button>
        </form>
    )
}

export default function AdminAccessPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Admin Portal</CardTitle>
                    <CardDescription className="text-center">
                        Restricted access. Authorized personnel only.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <LoginForm />
                        </TabsContent>
                        <TabsContent value="register">
                            <RegisterForm />
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="text-center text-xs text-muted-foreground justify-center">
                    <p>DevOrg Security System V1.0</p>
                </CardFooter>
            </Card>
        </div>
    )
}
