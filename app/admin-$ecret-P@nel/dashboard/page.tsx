import { verifyAdmin } from "@/lib/auth-admin"
import { redirect } from "next/navigation"
import { getAdminUsers, getPendingRequests, approveAdmin, deleteAdmin } from "@/app/actions/users"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LogOut, UserCheck, UserPlus, Trash2 } from "lucide-react"

export default async function AdminDashboard() {
    const admin = await verifyAdmin()
    if (!admin) {
        redirect(`/${process.env.SECRET_ADMIN_PATH || 'admin-$ecret-P@nel'}`)
    }

    const [approvedAdmins, pendingRequests] = await Promise.all([
        getAdminUsers(),
        getPendingRequests()
    ])

    return (
        <div className="min-h-screen bg-neutral-50 p-6 md:p-12">
            <header className="max-w-6xl mx-auto flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
                    <p className="text-neutral-500 mt-1">Welcome back, <span className="font-semibold text-neutral-800">{admin.email}</span></p>
                </div>
                <form action="/api/admin/auth/logout" method="POST">
                    <Button variant="outline" className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Button>
                </form>
            </header>

            <main className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
                {/* Pending Approvals */}
                <Card className="border-amber-200 bg-amber-50/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-800">
                            <UserPlus className="w-5 h-5" />
                            Pending Approvals
                        </CardTitle>
                        <CardDescription>Review new admin registration requests</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {pendingRequests.length === 0 ? (
                            <p className="text-neutral-400 py-4 text-center">No pending requests</p>
                        ) : (
                            <div className="space-y-4">
                                {pendingRequests.map((req: { id: number; email: string; requestedAt: Date }) => (
                                    <div key={req.id} className="flex items-center justify-between p-4 bg-white border border-amber-100 rounded-lg shadow-sm">
                                        <div>
                                            <p className="font-medium text-neutral-900">{req.email}</p>
                                            <p className="text-xs text-neutral-500 mt-0.5">Requested on {new Date(req.requestedAt).toLocaleDateString()}</p>
                                        </div>
                                        <form action={async () => {
                                            'use server'
                                            await approveAdmin(req.email)
                                        }}>
                                            <Button size="sm" className="bg-amber-600 hover:bg-amber-700">Approve</Button>
                                        </form>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Approved Admins */}
                <Card className="border-neutral-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-neutral-800">
                            <UserCheck className="w-5 h-5" />
                            Approved Admins
                        </CardTitle>
                        <CardDescription>Current members with admin access</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {approvedAdmins.map((user: { id: number; email: string; approvedBy: string | null }) => (
                                <div key={user.id} className="flex items-center justify-between p-4 bg-neutral-50 border border-neutral-100 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="font-medium text-neutral-900">{user.email}</p>
                                            <div className="flex gap-2 mt-1">
                                                {user.approvedBy === 'system' ? (
                                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none text-[10px]">System Admin</Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-[10px]">Approved by {user.approvedBy}</Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {user.email !== admin.email && user.approvedBy !== 'system' && (
                                        <form action={async () => {
                                            'use server'
                                            await deleteAdmin(user.email)
                                        }}>
                                            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-red-600">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </form>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
