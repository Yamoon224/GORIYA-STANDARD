"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MapPin, Clock, Building2, Heart, Bookmark, Share2, TrendingUp, Award, ChevronDown } from "lucide-react"
import { jobService } from "@/lib/api/job.service"

export default function Page({ params }: { params: { id: string } }) {
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [job, setJob] = useState<any>(null)

    useEffect(() => {
        jobService.getJobById(params.id)
            .then((res) => setJob(res.data))
            .catch(() => {})
    }, [params.id])

    if (!job) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-muted-foreground">Chargement...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main>
                {/* Hero Section */}
                <div className="relative h-80 overflow-hidden">
                    <img
                        src={job.coverImage || "/placeholder.svg"}
                        alt="Office environment"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Job Info Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                                    <img
                                        src={job.logo || "/placeholder.svg"}
                                        alt={`${job.company} logo`}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                </div>
                                <div className="text-white">
                                    <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1">
                                            <Building2 className="w-4 h-4" />
                                            {job.company}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {job.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {job.duration}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                                <Heart className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Job Details */}
                            <div className="flex items-center gap-4 mb-6">
                                <Badge variant="secondary">{job.type}</Badge>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>Compétences et expérience</span>
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {job.skills.map((skill: any, index: number) => (
                                    <Badge key={index} variant="outline" className="px-3 py-1">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>

                            {/* Job Description */}
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">Le poste</h2>
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-foreground">Descriptif du poste</h3>
                                        <p className="text-muted-foreground leading-relaxed">{job.description.role}</p>
                                        {job.description.details.map((detail: any, index: number) => (
                                            <p key={index} className="text-muted-foreground leading-relaxed">
                                                {detail}
                                            </p>
                                        ))}
                                        <p className="text-muted-foreground leading-relaxed">{job.description.yourRole}</p>
                                        <ul className="space-y-3">
                                            {job.description.responsibilities.map((responsibility: any, index: number) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                                    <span className="text-muted-foreground leading-relaxed">{responsibility}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Profile Requirements */}
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-4">Profil recherché</h3>
                                    <h4 className="font-medium text-foreground mb-3">Background</h4>
                                    <ul className="space-y-3">
                                        {job.profile.background.map((requirement: any, index: number) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                                <span className="text-muted-foreground leading-relaxed">{requirement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Interview Process */}
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-4">Déroulement des entretiens</h3>
                                    <div className="space-y-4">
                                        {job.interviews.map((interview: any, index: number) => (
                                            <div key={index} className="border-l-2 border-blue-600 pl-4">
                                                <h4 className="font-medium text-foreground mb-2">{interview.type}</h4>
                                                <p className="text-muted-foreground text-sm leading-relaxed">{interview.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* FAQ */}
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-4">Prêt(e) à nous rejoindre ?</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Si vous vous reconnaissez dans cette description et que vous êtes prêt à relever le défi, évaluez
                                        des compétences ! ✨
                                    </p>
                                    <p className="text-muted-foreground mb-6">Nous avons hâte de découvrir votre candidature.</p>

                                    <h3 className="text-xl font-bold text-foreground mb-6">Questions et réponses sur l'offre</h3>
                                    <Accordion type="single" collapsible className="space-y-2">
                                        {job.questions.map((question: any, index: number) => (
                                            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                                                <AccordionTrigger className="text-left hover:no-underline">
                                                    <span className="text-sm font-medium">{question}</span>
                                                </AccordionTrigger>
                                                <AccordionContent className="text-sm text-muted-foreground">
                                                    Réponse à venir...
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Salary Info */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">{job.salary}</p>
                                            <p className="text-sm text-muted-foreground">Salaire</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                            <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">Temps plein</p>
                                            <p className="text-sm text-muted-foreground">Type</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                            <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">Sur site</p>
                                            <p className="text-sm text-muted-foreground">Lieu de travail</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Button
                                            className="w-full bg-blue-600 hover:bg-blue-700"
                                            onClick={() => setIsBookmarked(!isBookmarked)}
                                        >
                                            <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                                            Sauvegarder
                                        </Button>
                                        <Button variant="outline" className="w-full bg-transparent">
                                            <Share2 className="w-4 h-4 mr-2" />
                                            Partager
                                        </Button>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700">Postuler</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Company Discovery */}
                            <Card className="bg-blue-600 text-white">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-2">Découvrez l'entreprise</h3>
                                    <p className="text-sm mb-4 text-blue-100">
                                        Apprenez-en plus sur l'entreprise et son équipe pour mieux vous préparer à votre entretien.
                                    </p>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                                            Voir le
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="border-white text-white hover:bg-white/10 bg-transparent"
                                        >
                                            Voir l'entreprise
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Profile Match */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-foreground mb-4">Votre profil correspond à cette offre</h3>
                                    <div className="text-center mb-4">
                                        <div className="relative w-24 h-24 mx-auto mb-2">
                                            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                                                <path
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeDasharray={`${job.companyProfile.match}, 100`}
                                                    className="text-blue-600"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-2xl font-bold text-blue-600">{job.companyProfile.match}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {job.companyProfile.metrics.map((metric: any, index: number) => (
                                            <div key={index}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-muted-foreground text-xs leading-tight">{metric.label}</span>
                                                    <span className="font-medium text-xs">{metric.value}</span>
                                                </div>
                                                <Progress value={Number.parseInt(metric.value)} className="h-2" />
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Related Jobs */}
                            <Card className="bg-blue-600 text-white">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className="w-8 h-8 bg-white rounded-full border-2 border-blue-600" />
                                            ))}
                                        </div>
                                    </div>
                                    <h3 className="font-semibold mb-2">
                                        Obtenez plus de privilège aux offres d'emploi pour lesquelles vous seriez un bon candidat et plus
                                        encore
                                    </h3>
                                    <p className="text-sm mb-4 text-blue-100">
                                        Faites grandir vos l'envoi gratuit avec assistance 24h/24 et 7j/7. Nous vous enverrons un rappel 3
                                        jours avant qu'il ne soit expiré.
                                    </p>
                                    <Button size="sm" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                                        Essayez dès maintenant
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
