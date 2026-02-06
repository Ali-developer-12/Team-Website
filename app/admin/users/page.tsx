import { getAdminUsers, approveAdmin, rejectAdmin, deleteAdmin, getWebsiteUsers } from "@/app/actions/users"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Trash2, Shield } from "lucide-react"
import { auth } from "@/auth"

export default async function UsersPage() {
    const session = await auth()
    const admins = await getAdminUsers()
    const users = await getWebsiteUsers()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                <p className="text-muted-foreground">Manage administrative access and website users.</p>
            </div>

            <Tabs defaultValue="admins" className="w-full">
                <TabsList>
                    <TabsTrigger value="admins">Admin Users</TabsTrigger>
                    <TabsTrigger value="users">Website Users</TabsTrigger>
                </TabsList>

                <TabsContent value="admins" className="space-y-4 pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Administrators</CardTitle>
                            <CardDescription>Manage admin access and approvals.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted/50 font-medium">
                                        <tr>
                                            <th className="p-4">Username</th>
                                            <th className="p-4">Email</th>
                                            <th className="p-4">Role</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {admins.map(admin => (
                                            <tr key={admin.id}>
                                                <td className="p-4 font-medium">{admin.username}</td>
                                                <td className="p-4">{admin.email}</td>
                                                <td className="p-4">{admin.role}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${admin.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                                                            admin.status === 'PENDING' ? 'bg-orange-100 text-orange-700' :
                                                                'bg-red-100 text-red-700'
                                                        }`}>
                                                        {admin.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {admin.status === 'PENDING' && (
                                                            <>
                                                                <form action={async () => { 'use server'; await approveAdmin(admin.id) }}>
                                                                    <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                                                                        <Check className="h-4 w-4" />
                                                                    </Button>
                                                                </form>
                                                                <form action={async () => { 'use server'; await rejectAdmin(admin.id) }}>
                                                                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                                                                        <X className="h-4 w-4" />
                                                                    </Button>
                                                                </form>
                                                            </>
                                                        )}
                                                        {session?.user?.role === 'SUPER_ADMIN' && admin.id !== session.user.id && (
                                                            <form action={async () => { 'use server'; await deleteAdmin(admin.id) }}>
                                                                <Button size="sm" variant="ghost" className="text-red-500">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </form>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="users" className="space-y-4 pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Registered Users</CardTitle>
                            <CardDescription>Users who signed up via GitHub/OAuth.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted/50 font-medium">
                                        <tr>
                                            <th className="p-4">Name</th>
                                            <th className="p-4">Email</th>
                                            <th className="p-4">Role</th>
                                            <th className="p-4">Joined</th>
                                            <th className="p-4">Activity</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {users.map(user => (
                                            <tr key={user.id}>
                                                <td className="p-4 flex items-center gap-2">
                                                    <img src={user.image || ''} className="h-6 w-6 rounded-full" />
                                                    {user.name}
                                                </td>
                                                <td className="p-4">{user.email}</td>
                                                <td className="p-4">{user.role}</td>
                                                <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                                                <td className="p-4 text-gray-500">
                                                    {user._count.applications} Apps
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
