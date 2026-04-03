"use client"

import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Building2, Users, Star, ArrowRight, Search, Heart, Bookmark } from "lucide-react"

// Mock user state - in real app this would come from auth context
const isLoggedIn = false // Change this to true to see logged in state

const jobListings = [
    {
        id: 1,
        title: "Business Developer International (H/F)",
        company: "Pitch",
        location: "Marcory, Zone 4",
        type: "CDI",
        duration: "Il y a 20 jours",
        salary: "200 000 FCFA / mois",
        logo: "/pitch-logo-black.jpg",
        image: "/international-business-team.jpg",
        saved: false,
    },
    {
        id: 2,
        title: "Business Developer Junior (H/F)",
        company: "Pitch",
        location: "Plateau",
        type: "CDI",
        duration: "Il y a 20 jours",
        salary: "150 000 FCFA / mois",
        logo: "/pitch-logo-black.jpg",
        image: "/junior-developer-team.jpg",
        saved: true,
    },
    {
        id: 3,
        title: "Data base engineer SQL et PLSQL (H/F)",
        company: "Pitch",
        location: "Bingerville Rue P368",
        type: "CDI",
        duration: "Il y a 20 jours",
        salary: "250 000 FCFA / mois",
        logo: "/pitch-logo-black.jpg",
        image: "/database-engineer-workspace.jpg",
        saved: false,
    },
    {
        id: 4,
        title: "Marketing Manager (H/F)",
        company: "Twitter",
        location: "Abidjan, Côte d'Ivoire",
        type: "CDI",
        duration: "Il y a 3 jours",
        salary: "300 000 FCFA / mois",
        logo: "/generic-bird-logo.png",
        image: "/marketing-team-workspace.jpg",
        saved: false,
    },
    {
        id: 5,
        title: "UX Designer Senior (H/F)",
        company: "Marketing REVOLUT",
        location: "Abidjan, Côte d'Ivoire",
        type: "CDI",
        duration: "Il y a 1 semaine",
        salary: "280 000 FCFA / mois",
        logo: "/revolut-logo.png",
        image: "/ux-designer-workspace.jpg",
        saved: true,
    },
    {
        id: 6,
        title: "Développeur Frontend React (H/F)",
        company: "Pitch",
        location: "Abidjan Plateau",
        type: "CDI",
        duration: "Il y a 5 jours",
        salary: "220 000 FCFA / mois",
        logo: "/pitch-logo-black.jpg",
        image: "/frontend-developer-workspace.jpg",
        saved: false,
    },
]

export default function Page() {
    const [savedJobs, setSavedJobs] = useState<number[]>([2, 5])

    const toggleSaveJob = (jobId: number) => {
        setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
    }

    if (!isLoggedIn) {
        // Disconnected state - Landing page
        return (
            <div className="min-h-screen bg-background">
                <Header />

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-5xl font-bold mb-6 text-balance">Trouvez votre emploi idéal avec Goriya</h1>
                        <p className="text-xl mb-8 max-w-2xl mx-auto text-pretty">
                            Connectez-vous avec les meilleures entreprises et découvrez des opportunités qui correspondent à vos
                            compétences et aspirations.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link href="/auth/signin">
                                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 transition-colors">
                                    Commencer maintenant
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent transition-colors">
                                En savoir plus
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Job Search Section */}
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Offres d'emploi populaires</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
                                Découvrez les dernières opportunités dans votre domaine
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Card
                                    key={i}
                                    className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border bg-card"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-sm flex items-center justify-center">
                                                <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <Badge variant="secondary">CDI</Badge>
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2 text-card-foreground">Développeur Full Stack</h3>
                                        <p className="text-muted-foreground mb-4">TechCorp Solutions</p>
                                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            Paris, France
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                                            <Clock className="w-4 h-4 mr-1" />
                                            Publié il y a 2 jours
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-blue-600 dark:text-blue-400">45k - 65k €</span>
                                            <Button size="sm" className="transition-colors">
                                                Postuler
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center">
                            <Link href="/emplois">
                                <Button
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                                >
                                    Voir toutes les offres
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Find Your Job Section */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">FIND YOUR JOB</h2>
                        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
                            Utilisez nos outils avancés pour trouver l'emploi parfait
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center group">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
                                    <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2 text-foreground">Recherche avancée</h3>
                                <p className="text-muted-foreground">
                                    Filtrez par localisation, salaire, type de contrat et plus encore
                                </p>
                            </div>
                            <div className="text-center group">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
                                    <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2 text-foreground">Réseau professionnel</h3>
                                <p className="text-muted-foreground">Connectez-vous avec des professionnels de votre secteur</p>
                            </div>
                            <div className="text-center group">
                                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
                                    <Star className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2 text-foreground">Recommandations</h3>
                                <p className="text-muted-foreground">Recevez des suggestions personnalisées basées sur votre profil</p>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        )
    }

    // Connected state - Dashboard-like homepage
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-6 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Bonjour, John!</h1>
                    <p className="text-muted-foreground">Voici les dernières opportunités pour vous</p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-2xl">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                            placeholder="Recherchez un emploi par intitulé, poste, mot clé ou entreprise..."
                            className="pl-12 h-12 text-base"
                        />
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
                            <p className="text-sm text-muted-foreground">Candidatures envoyées</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-green-600 mb-1">3</div>
                            <p className="text-sm text-muted-foreground">Entretiens programmés</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-purple-600 mb-1">8</div>
                            <p className="text-sm text-muted-foreground">Offres sauvegardées</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-orange-600 mb-1">95%</div>
                            <p className="text-sm text-muted-foreground">Profil complété</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recommended Jobs */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-foreground">Recommandé pour vous</h2>
                        <Link href="/emplois" className="text-blue-600 hover:text-blue-700 font-medium">
                            Voir tout
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {jobListings.slice(0, 4).map((job) => (
                            <Card key={job.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden">
                                                <img
                                                    src={job.logo || "/placeholder.svg"}
                                                    alt={`${job.company} logo`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground">{job.company}</h3>
                                                <p className="text-sm text-muted-foreground">{job.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => toggleSaveJob(job.id)} className="p-2">
                                                <Bookmark
                                                    className={`w-4 h-4 ${savedJobs.includes(job.id) ? "fill-current text-blue-600" : "text-muted-foreground"
                                                        }`}
                                                />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="p-2">
                                                <Heart className="w-4 h-4 text-muted-foreground" />
                                            </Button>
                                        </div>
                                    </div>

                                    <Link href={`/emploi/${job.id}`} className="hover:underline">
                                        <h4 className="font-semibold text-lg mb-2 text-foreground">{job.title}</h4>
                                    </Link>

                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                        <Badge variant="secondary">{job.type}</Badge>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {job.duration}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-blue-600">{job.salary}</span>
                                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                            Postuler
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Activité récente</h2>
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="font-medium text-foreground">Candidature acceptée</p>
                                        <p className="text-sm text-muted-foreground">
                                            Votre candidature pour "Business Developer" chez Pitch a été acceptée
                                        </p>
                                    </div>
                                    <span className="text-sm text-muted-foreground">Il y a 2h</span>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="font-medium text-foreground">Nouvelle recommandation</p>
                                        <p className="text-sm text-muted-foreground">3 nouvelles offres correspondent à votre profil</p>
                                    </div>
                                    <span className="text-sm text-muted-foreground">Il y a 1 jour</span>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="font-medium text-foreground">Profil consulté</p>
                                        <p className="text-sm text-muted-foreground">
                                            Votre profil a été consulté par 5 recruteurs cette semaine
                                        </p>
                                    </div>
                                    <span className="text-sm text-muted-foreground">Il y a 3 jours</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    )
}
