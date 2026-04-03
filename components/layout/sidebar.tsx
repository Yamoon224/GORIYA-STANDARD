"use client"

import Link from "next/link"
import { AppLogo } from "@/components/app-logo"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Home,
    MessageSquare,
    Briefcase,
    Building2,
    User,
    Settings,
    Search,
    FileText,
    Bot,
    FolderPlus,
    HelpCircle,
} from "lucide-react"

const sidebarItems = [
    {
        title: "Tableau de bord",
        href: "/dashboard",
        icon: Home,
    },
    {
        title: "Messages",
        href: "/messages",
        icon: MessageSquare,
    },
    {
        title: "Mes offres",
        href: "/mes-offres",
        icon: Briefcase,
    },
    {
        title: "Chercher un emploi",
        href: "/chercher-emploi",
        icon: Search,
    },
    {
        title: "Parcourir les entreprises",
        href: "/entreprises",
        icon: Building2,
    },
    {
        title: "Mon Profil",
        href: "/profil",
        icon: User,
    },
    {
        title: "Simulation d'entretien",
        href: "/simulation-entretien-config",
        icon: Bot,
    },
    {
        title: "Créer CV",
        href: "/creer-cv",
        icon: FileText,
    },
    {
        title: "Créer Portfolio",
        href: "/creer-portfolio",
        icon: FolderPlus,
    },
    {
        title: "Nouveau document",
        href: "/nouveau-document",
        icon: FileText,
    },
    {
        title: "Analyser CV",
        href: "/analyser-cv",
        icon: FileText,
    },
]

const parameterItems = [
    {
        title: "Centre d'assistance",
        href: "/centre-assistance",
        icon: HelpCircle,
    },
    {
        title: "Paramètres",
        href: "/parametres",
        icon: Settings,
    },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="w-64 bg-background border-r border-border h-screen flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-center">
                <Link href="/">
                    <AppLogo width={100} />
                </Link>
            </div>

            <nav className="flex-1 px-3 sm:px-4 py-4 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                pathname === item.href
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                            )}
                        >
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span className="truncate">{item.title}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="px-3 sm:px-4 pb-4 border-t border-border pt-4">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">Paramètres</div>
                <div className="space-y-1">
                    {parameterItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                    pathname === item.href
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                )}
                            >
                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                <span className="truncate">{item.title}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
