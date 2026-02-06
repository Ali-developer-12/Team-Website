import TeamMemberForm from "@/components/admin/team-form"
import { Card, CardContent } from "@/components/ui/card"

export default function NewTeamMemberPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add Team Member</h1>
                <p className="text-muted-foreground">Add a new developer to the roster.</p>
            </div>
            <Card>
                <CardContent className="pt-6">
                    <TeamMemberForm />
                </CardContent>
            </Card>
        </div>
    )
}
