"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MessageCircle, FileText, Settings, CreditCard, ChevronRight } from "lucide-react"
import { TawkToChat } from "@/components/tawk-to-chat"

const categories = [
    { id: "candidatures", name: "Candidatures", icon: FileText, color: "bg-blue-100 text-blue-600" },
    { id: "cv", name: "CV & Profil", icon: FileText, color: "bg-green-100 text-green-600" },
    { id: "entreprises", name: "Entreprises", icon: Settings, color: "bg-orange-100 text-orange-600" },
    { id: "facturation", name: "Facturation", icon: CreditCard, color: "bg-red-100 text-red-600" },
]

const faqItems = [
    {
        id: "1",
        question: "Comment optimiser mon profil pour les recruteurs ?",
        category: "cv",
        views: "2.1k vues",
    },
    {
        id: "2",
        question: "Comment supprimer à toutes les candidatures ?",
        category: "candidatures",
        views: "1.8k vues",
    },
    {
        id: "3",
        question: "Puis-je modifier mes infos après inscription ?",
        category: "cv",
        views: "1.5k vues",
    },
    {
        id: "4",
        question: "Comment annuler mon abonnement ?",
        category: "facturation",
        views: "1.2k vues",
    },
    {
        id: "5",
        question: "Comment contacter une entreprise directement ?",
        category: "entreprises",
        views: "980 vues",
    },
]

const suggestions = [
    {
        id: "1",
        title: "Guide de démarrage rapide",
        description: "Apprenez les bases pour bien commencer sur Goriya",
        badge: "Nouveau",
    },
    {
        id: "2",
        title: "Optimiser son profil Goriya",
        description: "Conseils pour améliorer votre visibilité",
        badge: "Populaire",
    },
]

export default function CentreAssistancePage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const filteredFaq = selectedCategory ? faqItems.filter((item) => item.category === selectedCategory) : faqItems

    return (
        <>
            <TawkToChat />

            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Centre d'assistance</h1>
                </div>

                <Card className="mb-8 bg-blue-600 text-white">
                    <CardContent className="p-8 text-center">
                        <h2 className="text-2xl font-semibold mb-2">Comment pouvons-nous vous aider ?</h2>
                        <p className="mb-6 opacity-90">
                            Trouvez rapidement des réponses à vos questions ou contactez notre équipe support
                        </p>

                        <div className="max-w-md mx-auto relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Rechercher dans l'aide..."
                                className="pl-10 bg-white text-gray-900"
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Parcourir par catégorie</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {categories.map((category) => {
                                    const Icon = category.icon
                                    return (
                                        <Card
                                            key={category.id}
                                            className={`cursor-pointer hover:shadow-md transition-shadow ${selectedCategory === category.id ? "ring-2 ring-blue-500" : ""
                                                }`}
                                            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                                        >
                                            <CardContent className="p-4 text-center">
                                                <div
                                                    className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-2`}
                                                >
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <p className="text-sm font-medium">{category.name}</p>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Foire aux questions</h3>
                            <div className="space-y-3">
                                {filteredFaq.map((item) => (
                                    <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900 mb-1">{item.question}</p>
                                                    <p className="text-sm text-gray-500">{item.views}</p>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Besoin d'aide personnalisée ?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 mb-4">
                                    Notre équipe support est là pour vous accompagner dans votre recherche d'emploi.
                                </p>
                                <Button className="w-full">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Nous contacter
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Suggestions utiles</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {suggestions.map((suggestion) => (
                                    <div key={suggestion.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-sm mb-1">{suggestion.title}</h4>
                                                <p className="text-xs text-gray-600">{suggestion.description}</p>
                                            </div>
                                            <Badge variant="secondary" className="text-xs">
                                                {suggestion.badge}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Contact rapide</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <p className="text-gray-600">support@goriya.com</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Téléphone</p>
                                        <p className="text-gray-600">+33 1 23 45 67 89</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Horaires</p>
                                        <p className="text-gray-600">Lun-Ven 9h-18h</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
