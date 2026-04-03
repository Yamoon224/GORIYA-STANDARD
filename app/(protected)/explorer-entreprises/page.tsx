"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Stethoscope, Factory, ShoppingCart, UtensilsCrossed, UserCheck, Laptop, ChevronRight } from "lucide-react"
import { companyService } from "@/lib/api/company.service"

const sectors = [
    {
        name: "Santé / Social / Environnement",
        icon: Stethoscope,
        color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    },
    {
        name: "Industrie",
        icon: Factory,
        color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    },
    {
        name: "Distribution",
        icon: ShoppingCart,
        color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    },
    {
        name: "Food et boisson",
        icon: UtensilsCrossed,
        color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    },
    {
        name: "Conseil / Audit",
        icon: UserCheck,
        color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    },
    {
        name: "Tech",
        icon: Laptop,
        color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    },
]

export default function ExploreCompaniesPage() {
    const [newCompanies, setNewCompanies] = useState<any[]>([])
    const [topRecruitingCompanies, setTopRecruitingCompanies] = useState<any[]>([])

    useEffect(() => {
        companyService.getCompanies().then((res) => setNewCompanies((res.data as any[]) || [])).catch(() => setNewCompanies([]))
        companyService.getRecruitingCompanies().then((res) => setTopRecruitingCompanies((res.data as any[]) || [])).catch(() => setTopRecruitingCompanies([]))
    }, [])

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-6 py-8">
                {/* Page Title */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-foreground mb-4">Explorer les entreprises.</h1>
                    <p className="text-muted-foreground max-w-4xl mx-auto text-pretty">
                        Ne vous contentez pas de postuler, découvrez l'histoire derrière chaque offre d'emploi. Naviguez à travers
                        notre sélection d'entreprises, lisez les témoignages d'employés et familiarisez-vous avec la culture de
                        chaque organisation. C'est ici que vous trouverez l'entreprise où vos compétences et vos valeurs
                        s'aligneront parfaitement.
                    </p>
                </div>

                {/* Sectors Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-foreground">Secteur d'activité</h2>
                        <Link href="/secteurs" className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                            Découvrir
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sectors.map((sector, index) => {
                            const IconComponent = sector.icon
                            return (
                                <Card
                                    key={index}
                                    className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                                >
                                    <CardContent className="p-8 text-center">
                                        <div
                                            className={`w-16 h-16 rounded-full ${sector.color} flex items-center justify-center mx-auto mb-4`}
                                        >
                                            <IconComponent className="w-8 h-8" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-4 text-foreground">{sector.name}</h3>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700">Découvrir</Button>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>

                {/* New Companies Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-foreground">Nouvelles entreprises à explorer</h2>
                        <Link
                            href="/nouvelles-entreprises"
                            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Découvrir
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {newCompanies.map((company) => (
                            <Card key={company.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={company.logo || "/placeholder.svg"}
                                                alt={`${company.name} logo`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-sm text-foreground truncate">{company.name}</h3>
                                            <p className="text-xs text-muted-foreground truncate">{company.sector}</p>
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            {company.offers}
                                        </Badge>
                                    </div>

                                    <p className="text-xs text-muted-foreground mb-3 line-clamp-3">{company.description}</p>

                                    <div className="flex gap-1 mb-4">
                                        {company.tags.map((tag: any, tagIndex: number) => (
                                            <Badge key={tagIndex} variant="secondary" className="text-xs px-2 py-1">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <p className="text-xs text-muted-foreground mb-3">{company.location}</p>

                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                                            Marketing
                                        </Button>
                                        <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                                            Conception
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Top Recruiting Companies */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-foreground">Les entreprises qui recrutent le plus souvent</h2>
                        <Link
                            href="/entreprises-qui-recrutent"
                            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Découvrir
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {topRecruitingCompanies.map((company) => (
                            <Card key={company.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={company.logo || "/placeholder.svg"}
                                                alt={`${company.name} logo`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-sm text-foreground truncate">{company.name}</h3>
                                            <p className="text-xs text-muted-foreground truncate">{company.sector}</p>
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            {company.offers}
                                        </Badge>
                                    </div>

                                    <p className="text-xs text-muted-foreground mb-3 line-clamp-3">{company.description}</p>

                                    <div className="flex gap-1 mb-4">
                                        {company.tags.map((tag: any, tagIndex: number) => (
                                            <Badge key={tagIndex} variant="secondary" className="text-xs px-2 py-1">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <p className="text-xs text-muted-foreground mb-3">{company.location}</p>

                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                                            Marketing
                                        </Button>
                                        <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                                            Conception
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
