import TeamMemberForm from "@/components/admin/team-form"
import { getTeamMember } from "@/app/actions/team"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params
    const member = await getTeamMember(resolvedParams.id)

    if (!member) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Member</h1>
                <p className="text-muted-foreground">Edit details for {member.name}.</p>
            </div>
            <Card>
                <CardContent className="pt-6">
                    <TeamMemberForm member={member as any} />
                </CardContent>
            </Card>
        </div>
    )
}
