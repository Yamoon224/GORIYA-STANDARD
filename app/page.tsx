"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Clock, Building2, Users, Star, ArrowRight, Search, Heart, Bookmark } from "lucide-react"
import { jobService } from "@/lib/api/job.service"
import { IJobOffer } from "@/lib/@types/entities"

// Mock user state - in real app this would come from auth context
const isLoggedIn = false // Change this to true to see logged in state

export default function Page() {
    const [savedJobs, setSavedJobs] = useState<string[]>([])
    const [popularJobs, setPopularJobs] = useState<IJobOffer[]>([])
    const [jobsLoading, setJobsLoading] = useState(true)

    useEffect(() => {
        jobService.getJobs({ limit: 6 })
            .then((res) => setPopularJobs(res.data ?? []))
            .catch(() => setPopularJobs([]))
            .finally(() => setJobsLoading(false))
    }, [])

    const toggleSaveJob = (jobId: string) => {
        setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
    }

    if (!isLoggedIn) {
        // Disconnected state - Landing page
        return (
            <div className="min-h-screen bg-background">
                <Header />

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white py-12 sm:py-20">
                    <div className="container mx-auto px-4 sm:px-6 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance">Trouvez votre emploi idéal avec Goriya</h1>
                        <p className="text-base sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-pretty">
                            Connectez-vous avec les meilleures entreprises et découvrez des opportunités qui correspondent à vos
                            compétences et aspirations.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
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
                <section className="py-10 sm:py-16 bg-muted/30">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="text-center mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-balance">Offres d'emploi populaires</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
                                Découvrez les dernières opportunités dans votre domaine
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {jobsLoading
                                ? Array.from({ length: 6 }).map((_, i) => (
                                    <Card key={i} className="border-border bg-card">
                                        <CardContent className="p-6 space-y-3">
                                            <Skeleton className="h-12 w-12 rounded-sm" />
                                            <Skeleton className="h-5 w-3/4" />
                                            <Skeleton className="h-4 w-1/2" />
                                            <Skeleton className="h-4 w-2/3" />
                                            <Skeleton className="h-4 w-1/3" />
                                        </CardContent>
                                    </Card>
                                ))
                                : popularJobs.map((job) => (
                                    <Card
                                        key={job.id}
                                        className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border bg-card"
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-sm flex items-center justify-center flex-shrink-0">
                                                    {job.company?.logo ? (
                                                        <img src={job.company.logo} alt={job.company.name} className="w-full h-full object-cover rounded-sm" />
                                                    ) : (
                                                        <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                                    )}
                                                </div>
                                                <Badge variant="secondary">{job.type}</Badge>
                                            </div>
                                            <h3 className="font-semibold text-lg mb-1 text-card-foreground line-clamp-2">{job.title}</h3>
                                            <p className="text-muted-foreground mb-3 truncate">{job.company?.name ?? "—"}</p>
                                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                                                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                                                <span className="truncate">{job.location}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-muted-foreground mb-4">
                                                <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                                                {new Date(job.publishDate).toLocaleDateString("fr-FR")}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-blue-600 dark:text-blue-400 truncate mr-2">{job.salary}</span>
                                                <Link href={`/emplois`}>
                                                    <Button size="sm" className="transition-colors flex-shrink-0">
                                                        Postuler
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            }
                        </div>

                        <div className="text-center">
                            <Link href="/emplois">
                                <Button
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors">
                                    Voir toutes les offres
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Find Your Job Section */}
                <section className="py-10 sm:py-16 bg-background">
                    <div className="container mx-auto px-4 sm:px-6 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-balance">FIND YOUR JOB</h2>
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

            <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                {/* Welcome Section */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Bonjour, John!</h1>
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
                <div className="mb-6 sm:mb-8">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Recommandé pour vous</h2>
                        <Link href="/emplois" className="text-blue-600 hover:text-blue-700 font-medium">
                            Voir tout
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {popularJobs.slice(0, 4).map((job) => (
                            <Card key={job.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
                                                {job.company?.logo ? (
                                                    <img
                                                        src={job.company.logo}
                                                        alt={`${job.company.name} logo`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <Building2 className="w-6 h-6 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-foreground truncate">{job.company?.name ?? "—"}</h3>
                                                <p className="text-sm text-muted-foreground truncate">{job.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <Button variant="ghost" size="sm" onClick={() => toggleSaveJob(job.id)} className="p-2">
                                                <Bookmark
                                                    className={`w-4 h-4 ${savedJobs.includes(job.id) ? "fill-current text-blue-600" : "text-muted-foreground"}`}
                                                />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="p-2">
                                                <Heart className="w-4 h-4 text-muted-foreground" />
                                            </Button>
                                        </div>
                                    </div>

                                    <Link href={`/emplois`} className="hover:underline">
                                        <h4 className="font-semibold text-lg mb-2 text-foreground line-clamp-2">{job.title}</h4>
                                    </Link>

                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                        <Badge variant="secondary">{job.type}</Badge>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {new Date(job.publishDate).toLocaleDateString("fr-FR")}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-blue-600 truncate mr-2">{job.salary}</span>
                                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-shrink-0">
                                            Postuler
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Activité récente</h2>
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 mt-2 sm:mt-0 flex-shrink-0 bg-green-500 rounded-full"></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-foreground">Candidature acceptée</p>
                                        <p className="text-sm text-muted-foreground">
                                            Votre candidature pour "Business Developer" chez Pitch a été acceptée
                                        </p>
                                    </div>
                                    <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">Il y a 2h</span>
                                </div>
                                <div className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 mt-2 sm:mt-0 flex-shrink-0 bg-blue-500 rounded-full"></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-foreground">Nouvelle recommandation</p>
                                        <p className="text-sm text-muted-foreground">3 nouvelles offres correspondent à votre profil</p>
                                    </div>
                                    <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">Il y a 1 jour</span>
                                </div>
                                <div className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 mt-2 sm:mt-0 flex-shrink-0 bg-orange-500 rounded-full"></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-foreground">Profil consulté</p>
                                        <p className="text-sm text-muted-foreground">
                                            Votre profil a été consulté par 5 recruteurs cette semaine
                                        </p>
                                    </div>
                                    <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">Il y a 3 jours</span>
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
