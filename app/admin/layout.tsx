import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, FileText, Users, Briefcase, Settings, LogOut, Shield, Component } from "lucide-react"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()

    // Strict Admin Check
    // @ts-ignore
    if (!session?.user?.isAdmin) {
        redirect("/admin-secret-access")
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">DevOrg Admin</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <NavLink href="/admin" icon={<LayoutDashboard />} label="Dashboard" />
                    <NavLink href="/admin/blog" icon={<FileText />} label="Blog" />
                    <NavLink href="/admin/team" icon={<Users />} label="Team" />
                    <NavLink href="/admin/jobs" icon={<Briefcase />} label="Jobs" />
                    <NavLink href="/admin/services" icon={<Component />} label="Services" />
                    <NavLink href="/admin/settings" icon={<Settings />} label="Settings" />
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 px-2 py-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <span className="font-bold text-blue-700 dark:text-blue-300">
                                {session.user.name?.[0]?.toUpperCase() || 'A'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{session.user.name || session.user.email}</p>
                            <p className="text-xs text-muted-foreground truncate capitalize">
                                {session.user.role?.replace('_', ' ').toLowerCase()}
                            </p>
                        </div>
                    </div>
                    <form
                        action={async () => {
                            "use server"
                            // Import locally to avoid circular deps if needed, but import { signOut } from "@/auth" is fine
                            const { signOut } = await import("@/auth")
                            await signOut({ redirectTo: "/admin-secret-access" })
                        }}
                    >
                        <button className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-8 justify-between md:hidden">
                    <span className="font-bold">Admin Panel</span>
                    {/* Mobile menu trigger could go here */}
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
            <span className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors">{icon}</span>
            {label}
        </Link>
    )
}
