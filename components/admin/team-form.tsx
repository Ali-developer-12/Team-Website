'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createTeamMember, updateTeamMember } from "@/app/actions/team"

interface TeamMemberData {
    id?: string
    name: string | null
    email: string | null
    profile: {
        title: string | null
        bio: string | null
        skills: string[]
    } | null
}

export default function TeamMemberForm({ member }: { member?: TeamMemberData }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError('')

        const formData = new FormData(event.currentTarget)

        try {
            let result;
            if (member?.id) {
                result = await updateTeamMember(member.id, formData)
            } else {
                result = await createTeamMember(formData)
            }

            if (result.error) {
                setError(result.error)
            } else {
                router.push('/admin/team')
                router.refresh()
            }
        } catch (e) {
            setError("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input name="name" defaultValue={member?.name || ''} required placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" type="email" defaultValue={member?.email || ''} placeholder="john@example.com (Optional)" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="role">Role / Job Title</Label>
                <Input name="role" defaultValue={member?.profile?.title || ''} required placeholder="e.g. Senior Frontend Engineer" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Input
                    name="skills"
                    defaultValue={member?.profile?.skills.join(', ') || ''}
                    placeholder="React, TypeScript, Node.js (Comma separated)"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea name="bio" defaultValue={member?.profile?.bio || ''} placeholder="Short biography..." />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : (member?.id ? 'Update Member' : 'Add Member')}
                </Button>
            </div>
        </form>
    )
}
