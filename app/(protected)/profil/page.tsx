"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    MapPin,
    Mail,
    Phone,
    Calendar,
    Building2,
    GraduationCap,
    Award,
    ExternalLink,
    Edit,
    Plus,
    Briefcase,
} from "lucide-react"
import { userService } from "@/lib/api/user.service"
import { useState, useEffect } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProfileData = any

export default function ProfilePage() {
    const [profile, setProfile] = useState<ProfileData>(null)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            const response = await userService.getProfile()
            setProfile(response.data)
        } catch (error) {
            console.error("Erreur lors du chargement du profil:", error)

            // Données de démonstration
            setProfile({
                id: "1",
                firstName: "Estelle",
                lastName: "Doe",
                title: "Développeuse Full Stack",
                location: "Paris, France",
                email: "estelle.doe@email.com",
                phone: "+33 6 12 34 56 78",
                avatar: "/placeholder.svg?height=120&width=120",
                bio: "Développeuse passionnée avec 5 ans d'expérience dans le développement web moderne. Spécialisée en React, Node.js et les architectures cloud.",
                experience: [
                    {
                        id: "1",
                        company: "TechCorp",
                        position: "Senior Full Stack Developer",
                        startDate: "2022-01",
                        endDate: "",
                        current: true,
                        description:
                            "Développement d'applications web complexes avec React et Node.js. Lead technique sur plusieurs projets stratégiques.",
                        logo: "/placeholder.svg?height=40&width=40",
                    },
                    {
                        id: "2",
                        company: "StartupXYZ",
                        position: "Full Stack Developer",
                        startDate: "2020-06",
                        endDate: "2021-12",
                        current: false,
                        description:
                            "Développement de la plateforme principale de l'entreprise. Migration vers une architecture microservices.",
                        logo: "/placeholder.svg?height=40&width=40",
                    },
                ],
                education: [
                    {
                        id: "1",
                        institution: "École de technologie",
                        degree: "Master",
                        field: "Informatique et Systèmes d'Information",
                        startDate: "2018",
                        endDate: "2020",
                        logo: "/placeholder.svg?height=40&width=40",
                    },
                    {
                        id: "2",
                        institution: "Université Paris Tech",
                        degree: "Licence",
                        field: "Informatique",
                        startDate: "2015",
                        endDate: "2018",
                        logo: "/placeholder.svg?height=40&width=40",
                    },
                ],
                skills: ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker", "PostgreSQL", "MongoDB"],
                portfolio: [
                    {
                        id: "1",
                        title: "E-commerce Platform",
                        description: "Plateforme e-commerce complète avec paiement intégré",
                        image: "/placeholder.svg?height=200&width=300",
                        link: "https://example.com",
                    },
                    {
                        id: "2",
                        title: "Task Management App",
                        description: "Application de gestion de tâches collaborative",
                        image: "/placeholder.svg?height=200&width=300",
                        link: "https://example.com",
                    },
                    {
                        id: "3",
                        title: "Analytics Dashboard",
                        description: "Dashboard d'analytics en temps réel",
                        image: "/placeholder.svg?height=200&width=300",
                        link: "https://example.com",
                    },
                ],
            })
        }
    }

    if (!profile) {
        return (
            <div className="p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
                    <div className="space-y-4">
                        <div className="h-32 bg-muted rounded"></div>
                        <div className="h-32 bg-muted rounded"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Profile Header */}
            <Card className="mb-6">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-6">
                            <Avatar className="w-24 h-24">
                                <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-2xl">
                                    {profile.firstName[0]}
                                    {profile.lastName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-2xl font-bold text-foreground mb-1">
                                    {profile.firstName} {profile.lastName}
                                </h1>
                                <p className="text-lg text-muted-foreground mb-2">{profile.title}</p>
                                <div className="flex items-center text-muted-foreground mb-2">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {profile.location}
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-1" />
                                        {profile.email}
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="w-4 h-4 mr-1" />
                                        {profile.phone}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier le profil
                        </Button>
                    </div>
                    <p className="text-foreground">{profile.bio}</p>
                </CardContent>
            </Card>

            {/* Experience Section */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center">
                            <Briefcase className="w-5 h-5 mr-2" />À propos de moi
                        </span>
                        <Button variant="ghost" size="sm">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {profile.experience.map((exp: any) => (
                        <div key={exp.id} className="flex items-start space-x-4 pb-6 border-b border-border last:border-b-0">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                                <Building2 className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-foreground">{exp.position}</h3>
                                <p className="text-muted-foreground mb-1">{exp.company}</p>
                                <div className="flex items-center text-sm text-muted-foreground mb-2">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {exp.startDate} - {exp.current ? "Présent" : exp.endDate}
                                </div>
                                <p className="text-foreground text-sm">{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Education Section */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center">
                            <GraduationCap className="w-5 h-5 mr-2" />
                            Formation
                        </span>
                        <Button variant="ghost" size="sm">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {profile.education.map((edu: any) => (
                        <div key={edu.id} className="flex items-start space-x-4 pb-6 border-b border-border last:border-b-0">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                                <GraduationCap className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-foreground">
                                    {edu.degree} en {edu.field}
                                </h3>
                                <p className="text-muted-foreground mb-1">{edu.institution}</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {edu.startDate} - {edu.endDate}
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center">
                            <Award className="w-5 h-5 mr-2" />
                            Compétences
                        </span>
                        <Button variant="ghost" size="sm">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill: any) => (
                            <Badge key={skill} variant="secondary" className="px-3 py-1">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Portfolio Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Portfolio</span>
                        <Button variant="ghost" size="sm">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {profile.portfolio.map((item: any) => (
                            <div
                                key={item.id}
                                className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-32 object-cover" />
                                <div className="p-4">
                                    <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Voir le projet
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
