import Link from "next/link"
import { getTeamMembers, deleteTeamMember } from "@/app/actions/team"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusCircle, Edit, Trash2, GripVertical } from "lucide-react"

export default async function TeamAdminPage() {
    const members = await getTeamMembers()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
                    <p className="text-muted-foreground">Manage your developer team.</p>
                </div>
                <Link href="/admin/team/new">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Member
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {members.map((member) => (
                    <Card key={member.id} className="relative group">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="cursor-move text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <GripVertical className="h-5 w-5" />
                            </div>
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={member.image || ''} />
                                <AvatarFallback>{member.name?.[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <CardTitle className="text-base truncate">{member.name}</CardTitle>
                                <p className="text-xs text-muted-foreground truncate">{member.profile?.title || 'Developer'}</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-1 mb-4">
                                {member.profile?.skills.slice(0, 3).map(skill => (
                                    <span key={skill} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-[10px]">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <div className="flex justify-end gap-2">
                                <Link href={`/admin/team/${member.id}`}>
                                    <Button size="sm" variant="outline">
                                        <Edit className="h-3 w-3 mr-1" /> Edit
                                    </Button>
                                </Link>
                                <DeleteMemberButton id={member.id} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

function DeleteMemberButton({ id }: { id: string }) {
    return (
        <form action={async () => {
            'use server'
            await deleteTeamMember(id)
        }}>
            <Button size="sm" variant="destructive" type="submit">
                <Trash2 className="h-3 w-3 mr-1" /> Delete
            </Button>
        </form>
    )
}
