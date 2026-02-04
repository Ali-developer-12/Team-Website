import { BadgeCheck, Code2, Users } from "lucide-react"

export function Features() {
    return (
        <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 max-w-7xl mx-auto px-4">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                    Our Values
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    We believe in transparency, technical excellence, and community growth.
                </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                    <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                        <BadgeCheck className="h-12 w-12" />
                        <div className="space-y-2">
                            <h3 className="font-bold">Verified Skills</h3>
                            <p className="text-sm text-muted-foreground">
                                All members pass strict technical assessments.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                    <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                        <Users className="h-12 w-12" />
                        <div className="space-y-2">
                            <h3 className="font-bold">Team Focused</h3>
                            <p className="text-sm text-muted-foreground">
                                We work as a cohesive unit, not isolated freelancers.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                    <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                        <Code2 className="h-12 w-12" />
                        <div className="space-y-2">
                            <h3 className="font-bold">Open Source</h3>
                            <p className="text-sm text-muted-foreground">
                                Commitment to contributing back to the ecosystem.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
