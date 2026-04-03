import { Card, CardContent } from "@/components/ui/card"
import { Building2, Calendar, Eye } from "lucide-react"

interface DashboardStatsProps {
    totalApplications: number
    interviews: number
    profileViews: number
}

export function DashboardStats({ totalApplications, interviews, profileViews }: DashboardStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Candidatures</p>
                            <p className="text-3xl font-bold text-foreground">{totalApplications}</p>
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Entretiens</p>
                            <p className="text-3xl font-bold text-foreground">{interviews}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Vues du profil</p>
                            <p className="text-3xl font-bold text-foreground">{profileViews}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                            <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
