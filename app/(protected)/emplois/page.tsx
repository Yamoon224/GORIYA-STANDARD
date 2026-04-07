"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, MapPin, Clock, Heart } from "lucide-react"
import { FiltersModal } from "@/components/filters-modal"
import { jobService } from "@/lib/api/job.service"
import { companyService } from "@/lib/api/company.service"

const jobCategories = [
    "Vente/Commerce",
    "Conseil/Ressources humaines",
    "Informatique",
    "Finance/Comptabilité",
    "Gestion/Administration",
    "Logistique/Transport",
    "Santé/Médical",
    "Marketing/Communication",
    "Ingénierie",
    "Education/Formation",
    "Juridique",
    "Hôtellerie/Restauration",
    "Arts/Design",
    "Agriculture",
    "Construction/BTP",
    "Energie/Environnement",
    "Média/Journalisme",
    "Sport/Loisirs",
    "Sécurité",
    "Automobile",
    "Textile/Mode",
    "Immobilier",
]

export default function JobListingsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const [jobs, setJobs] = useState<any[]>([])
    const [popularCompanies, setPopularCompanies] = useState<any[]>([])

    useEffect(() => {
        jobService.getJobs().then((res) => setJobs((res.data as any[]) || [])).catch(() => setJobs([]))
        companyService.getRecruitingCompanies().then((res) => setPopularCompanies((res.data as any[]) || [])).catch(() => setPopularCompanies([]))
    }, [])

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 py-8">
                {/* Page Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-4">Explorer les offres d'emploi.</h1>
                    <p className="text-muted-foreground max-w-3xl mx-auto">
                        Trouvez l'opportunité parfaite parmi des milliers d'offres d'emploi. Naviguez à travers notre sélection
                        d'entreprises, lisez les témoignages d'employés et familiarisez-vous avec la culture de chaque organisation.
                        C'est ici que vous trouverez l'entreprise où vos compétences et vos valeurs s'aligneront parfaitement.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                                placeholder="Rechercher un emploi par intitulé, société, lieu ou mot-clé..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700">Rechercher</Button>
                    </div>

                    {/* Filter Tags */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <FiltersModal />
                            <Button variant="outline" className="bg-transparent">
                                Trier par
                            </Button>
                        </div>
                        <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">{jobs.length} emplois</span> trouvés
                        </p>
                    </div>
                </div>

                {/* Job Listings */}
                <div className="mb-12">
                    <h2 className="text-xl font-semibold mb-6">Recherches populaires</h2>
                    <div className="space-y-4">
                        {jobs.map((job) => (
                            <Card key={job.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={job.logo || "/placeholder.svg"}
                                                        alt={`${job.company} logo`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <Link href={`/emplois/${job.id}`} className="hover:underline">
                                                        <h3 className="font-semibold text-lg text-foreground mb-1">{job.title}</h3>
                                                    </Link>
                                                    <p className="text-muted-foreground mb-2">{job.company}</p>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="w-4 h-4" />
                                                            {job.location}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            {job.duration}
                                                        </div>
                                                        <Badge variant="secondary">{job.type}</Badge>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm">
                                                    <Heart className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden">
                                            <img
                                                src={job.image || "/placeholder.svg"}
                                                alt="Job preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Button className="bg-blue-600 hover:bg-blue-700">Voir plus</Button>
                    </div>
                </div>

                {/* Popular Companies */}
                <div className="bg-blue-600 text-white py-12 px-8 rounded-lg mb-12">
                    <h2 className="text-2xl font-bold text-center mb-8">Entreprises populaires</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {popularCompanies.map((company, index) => (
                            <Card key={index} className="bg-white text-foreground">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                                            <img
                                                src={company.logo || "/placeholder.svg"}
                                                alt={`${company.name} logo`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-sm">{company.name}</h3>
                                            <p className="text-xs text-muted-foreground">{company.sector}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-2">{company.location}</p>
                                    <p className="text-xs font-medium mb-3">{company.offers}</p>
                                    <div className="flex gap-2">
                                        {company.tags.map((tag: any, tagIndex: number) => (
                                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Job Categories */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-center mb-8">Catégories d'emploi</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {jobCategories.map((category, index) => (
                            <Link key={index} href={`/emplois/categorie/${category.toLowerCase().replace(/\//g, "-")}`}>
                                <Button
                                    variant="outline"
                                    className="w-full text-sm h-auto py-3 hover:bg-blue-50 hover:border-blue-200 bg-transparent"
                                >
                                    {category}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Career Tips Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-center mb-8">Prenez votre carrière en main</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Présentations des révisions UX",
                                description:
                                    "Comment présenter efficacement vos révisions UX aux parties prenantes et obtenir leur adhésion.",
                                image: "/ux-presentation-meeting.jpg",
                            },
                            {
                                title: "Migration vers Linear 101",
                                description:
                                    "Guide complet pour migrer votre équipe vers Linear et optimiser votre workflow de développement.",
                                image: "/team-migration-software.jpg",
                            },
                            {
                                title: "Construisez votre pile d'API",
                                description: "Les meilleures pratiques pour construire une architecture API robuste et évolutive.",
                                image: "/api-development-workspace.jpg",
                            },
                        ].map((tip, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <div className="aspect-video rounded-t-lg overflow-hidden">
                                    <img src={tip.image || "/placeholder.svg"} alt={tip.title} className="w-full h-full object-cover" />
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
                                    <p className="text-muted-foreground text-sm">{tip.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Button className="bg-blue-600 hover:bg-blue-700">Découvrir plus</Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
