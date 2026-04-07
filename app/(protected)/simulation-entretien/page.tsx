"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Star, RotateCcw, MessageSquare, X } from "lucide-react"

interface Message {
    id: string
    content: string
    sender: "user" | "goriya"
    timestamp: Date
}

export default function SimulationEntretienPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content:
                "Bonjour, je suis très intéressé par ce poste de Développeur Full-Stack Senior. J'ai 5 ans d'expérience en React et Node.js.",
            sender: "user",
            timestamp: new Date(),
        },
        {
            id: "2",
            content:
                "Bonjour Mme, merci pour votre candidature. Votre profil nous intéresse beaucoup. Pouvez-vous me parler de votre expérience avec React JS ?",
            sender: "goriya",
            timestamp: new Date(),
        },
        {
            id: "3",
            content:
                "Bien sûr ! J'ai utilisé React dans plusieurs projets, notamment pour une application de e-commerce où j'ai géré toute la partie front-end avec plus de 100 000 utilisateurs.",
            sender: "user",
            timestamp: new Date(),
        },
        {
            id: "4",
            content: "Parfait ! Nous aimerions vous rencontrer pour un entretien. Êtes-vous disponible cette semaine ?",
            sender: "goriya",
            timestamp: new Date(),
        },
        {
            id: "5",
            content:
                "Merci pour votre retour, je suis très intéressé par cette opportunité. Je suis disponible mercredi après-midi ou vendredi matin. Que préférez-vous commencer le mieux ?",
            sender: "user",
            timestamp: new Date(),
        },
    ])
    const [newMessage, setNewMessage] = useState("")
    const [showFeedback, setShowFeedback] = useState(false)

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            content: newMessage,
            sender: "user",
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setNewMessage("")

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: "Merci pour votre réponse. Pouvez-vous me parler de vos projets les plus significatifs ?",
                sender: "goriya",
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, aiResponse])
        }, 1000)
    }

    const handleRestart = () => {
        setMessages([])
        setShowFeedback(false)
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-foreground">Simulation d'Entretien avec Goriya</h1>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Button variant="outline" onClick={handleRestart} className="flex items-center gap-2 bg-transparent">
                        <RotateCcw className="w-4 h-4" />
                        Recommencer
                    </Button>
                    <Button onClick={() => setShowFeedback(true)} className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Voir le Feedback
                    </Button>
                </div>
            </div>

            {/* Chat Interface */}
            <Card className="h-[calc(100vh-220px)] sm:h-[600px] flex flex-col">
                <CardContent className="flex-1 p-0">
                    {/* Chat Header */}
                    <div className="flex items-center gap-3 p-4 border-b bg-blue-50">
                        <Avatar className="w-10 h-10 bg-blue-500">
                            <AvatarFallback className="text-white font-semibold">G</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold text-gray-900">Goriya</h3>
                        </div>
                        <div className="ml-auto flex gap-2">
                            <Button variant="ghost" size="sm">
                                <Star className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                                <MessageSquare className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[450px]">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`max-w-[70%] p-3 rounded-lg ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                                        }`}
                                >
                                    <p className="text-sm">{message.content}</p>
                                    <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                                        {message.timestamp.toLocaleTimeString("fr-FR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t bg-white">
                        <div className="flex gap-3">
                            <Input
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Tapez votre message..."
                                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                className="flex-1"
                            />
                            <Button onClick={handleSendMessage} className="px-4">
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Feedback Modal */}
            {showFeedback && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-2xl mx-4">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div></div>
                                <Button variant="ghost" size="sm" onClick={() => setShowFeedback(false)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="text-center mb-6">
                                <Avatar className="w-16 h-16 bg-blue-500 mx-auto mb-4">
                                    <AvatarFallback className="text-white text-2xl font-bold">G</AvatarFallback>
                                </Avatar>
                                <h2 className="text-xl font-semibold mb-2">Feedback de votre entretien</h2>
                                <p className="text-gray-600">Analyse de votre performance et conseils d'amélioration</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-500 mb-1">85%</div>
                                    <div className="text-sm text-gray-600">Score global</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-500 mb-1">8.5/10</div>
                                    <div className="text-sm text-gray-600">Communication</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-500 mb-1">12min</div>
                                    <div className="text-sm text-gray-600">Durée totale</div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <h3 className="font-semibold text-green-600 mb-2">Points forts</h3>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        <li>• Excellente présentation personnelle</li>
                                        <li>• Réponses structurées et claires</li>
                                        <li>• Bonne connaissance des entreprises</li>
                                        <li>• Confiance et professionnalisme</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-orange-600 mb-2">Points d'amélioration</h3>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        <li>• Développer davantage les exemples concrets</li>
                                        <li>• Améliorer la gestion du stress</li>
                                        <li>• Préparer plus de questions sur le poste</li>
                                    </ul>
                                </div>

                                <div className="bg-gray-800 text-white p-4 rounded-lg">
                                    <h3 className="font-semibold mb-2">Recommandations</h3>
                                    <p className="text-sm">
                                        Utilisez la méthode STAR pour structurer vos réponses. Pratiquez la respiration profonde pour la
                                        formation. Préparez 3-5 questions pertinentes sur l'entreprise. Entraînez-vous régulièrement avec
                                        notre IA Goriya.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button onClick={() => setShowFeedback(false)} variant="outline" className="flex-1">
                                    Fermer
                                </Button>
                                <Button onClick={handleRestart} className="flex-1">
                                    Nouvelle simulation
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
