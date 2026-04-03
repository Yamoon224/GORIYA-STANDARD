"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"

export function DashboardHeader() {
    const { user } = useAuth()

    const displayName = user?.name ?? "Utilisateur"
    const initials = displayName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Bonjour, {displayName}</h1>
                <p className="text-muted-foreground">Voici un aperçu de vos candidatures et offres d'emploi</p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">Prochaine entrevue</p>
                    <p className="font-medium text-foreground">Aujourd'hui</p>
                </div>
                <Avatar className="w-12 h-12">
                    <AvatarImage src={user?.avatar ?? undefined} />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}
