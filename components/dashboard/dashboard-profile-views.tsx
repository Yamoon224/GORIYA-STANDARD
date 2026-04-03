import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export function DashboardProfileViews() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Vues du profil ces 30 derniers jours</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-48 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <TrendingUp className="w-12 h-12 text-primary mx-auto mb-2" />
                        <p className="text-muted-foreground">Graphique des vues du profil</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
