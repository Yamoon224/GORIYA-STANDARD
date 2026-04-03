"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { FileText, User, Briefcase, GraduationCap, Award, Download, Eye, Save, CheckCircle } from "lucide-react"
import { generatePDF, previewDocument } from "@/lib/document-generator"

interface CVData {
    nom: string
    email: string
    telephone: string
    adresse: string
    profil: string
    competences: string
    experience: string
    formation: string
    langues: string
}

export default function Page() {
    const [analysisProgress, setAnalysisProgress] = useState(0)
    const [formData, setFormData] = useState<CVData>({
        nom: "",
        email: "",
        telephone: "",
        adresse: "",
        profil: "",
        competences: "",
        experience: "",
        formation: "",
        langues: "",
    })
    const [isSaved, setIsSaved] = useState(false)

    const handleInputChange = (field: keyof CVData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleAnalyze = () => {
        // Simulate analysis progress
        let progress = 0
        const interval = setInterval(() => {
            progress += 10
            setAnalysisProgress(progress)
            if (progress >= 100) {
                clearInterval(interval)
            }
        }, 200)
    }

    const generateCVContent = (): string => {
        return `${formData.nom || "[Votre nom]"}
${formData.email || "[Email]"} | ${formData.telephone || "[Téléphone]"}
${formData.adresse || "[Adresse]"}

PROFIL PROFESSIONNEL
${formData.profil || "Décrivez votre profil professionnel, vos objectifs de carrière et ce qui vous distingue des autres candidats."}

EXPÉRIENCE PROFESSIONNELLE
${formData.experience || "Listez vos expériences professionnelles en commençant par la plus récente. Incluez les dates, le nom de l'entreprise, votre poste et vos principales responsabilités."}

FORMATION
${formData.formation || "Indiquez votre parcours académique, vos diplômes et certifications pertinentes."}

COMPÉTENCES
${formData.competences || "Listez vos compétences techniques et professionnelles les plus importantes pour le poste visé."}

LANGUES
${formData.langues || "Indiquez les langues que vous maîtrisez et votre niveau pour chacune."}`
    }

    const handleDownloadPDF = () => {
        const content = generateCVContent()
        const filename = `cv-${formData.nom.toLowerCase().replace(/\s+/g, "-") || "document"}.pdf`
        generatePDF(content, filename)
    }

    const handlePreview = () => {
        const content = generateCVContent()
        previewDocument(content)
    }

    const handleSave = () => {
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 2000)
    }

    const completionPercentage =
        (Object.values(formData).filter((value) => value.trim() !== "").length / Object.keys(formData).length) * 100

    return (
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Créer CV Intelligent</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">Créez un CV professionnel avec l'aide de l'IA</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* CV Creator Section */}
                    <div className="lg:col-span-2">
                        <Card className="mb-6">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-semibold mb-2">Créateur de CV</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">Générez votre CV professionnel</p>

                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Progression</span>
                                        <span className="text-sm text-gray-600">{Math.round(completionPercentage)}%</span>
                                    </div>
                                    <Progress value={completionPercentage} className="h-2" />
                                </div>

                                {/* CV Creation Steps */}
                                <div className="space-y-3 mb-6">
                                    <div
                                        className={`flex items-center gap-3 p-3 rounded-lg ${formData.nom ? "bg-blue-50 dark:bg-blue-900/20" : "bg-gray-100 dark:bg-gray-800"}`}
                                    >
                                        <User className={`w-5 h-5 ${formData.nom ? "text-blue-600" : "text-gray-600"}`} />
                                        <span className="text-sm font-medium">Informations personnelles</span>
                                        {formData.nom && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
                                    </div>
                                    <div
                                        className={`flex items-center gap-3 p-3 rounded-lg ${formData.experience ? "bg-blue-50 dark:bg-blue-900/20" : "bg-gray-100 dark:bg-gray-800"}`}
                                    >
                                        <Briefcase className={`w-5 h-5 ${formData.experience ? "text-blue-600" : "text-gray-600"}`} />
                                        <span className="text-sm font-medium">Expérience professionnelle</span>
                                        {formData.experience && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
                                    </div>
                                    <div
                                        className={`flex items-center gap-3 p-3 rounded-lg ${formData.formation ? "bg-blue-50 dark:bg-blue-900/20" : "bg-gray-100 dark:bg-gray-800"}`}
                                    >
                                        <GraduationCap className={`w-5 h-5 ${formData.formation ? "text-blue-600" : "text-gray-600"}`} />
                                        <span className="text-sm font-medium">Formation</span>
                                        {formData.formation && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
                                    </div>
                                    <div
                                        className={`flex items-center gap-3 p-3 rounded-lg ${formData.competences ? "bg-blue-50 dark:bg-blue-900/20" : "bg-gray-100 dark:bg-gray-800"}`}
                                    >
                                        <Award className={`w-5 h-5 ${formData.competences ? "text-blue-600" : "text-gray-600"}`} />
                                        <span className="text-sm font-medium">Compétences</span>
                                        {formData.competences && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={handlePreview} className="flex-1 bg-transparent">
                                        <Eye className="w-4 h-4 mr-2" />
                                        Prévisualiser
                                    </Button>
                                    <Button onClick={handleDownloadPDF} className="flex-1">
                                        <Download className="w-4 h-4 mr-2" />
                                        Télécharger PDF
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Analysis Section */}
                        <Card>
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white text-2xl font-bold">G</span>
                                </div>
                                <h2 className="text-xl font-semibold mb-2">Analyse avec Goriya</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">Score d'optimisation de votre CV</p>

                                <div className="mb-6">
                                    <div className="text-4xl font-bold text-blue-500 mb-2">{analysisProgress}%</div>
                                    <Progress value={analysisProgress} className="h-2" />
                                </div>

                                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300 mb-6">
                                    <div>
                                        <div className="font-medium">Structure</div>
                                        <div>Bien</div>
                                    </div>
                                    <div>
                                        <div className="font-medium">Contenu</div>
                                        <div>Moyen</div>
                                    </div>
                                    <div>
                                        <div className="font-medium">Expérience</div>
                                        <div>Excellent</div>
                                    </div>
                                </div>

                                <Button onClick={handleAnalyze} className="w-full">
                                    Analyser avec Goriya
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Information Form */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <User className="w-5 h-5" />
                                        Informations personnelles
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={handleSave} disabled={isSaved}>
                                        {isSaved ? (
                                            <>
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                Sauvegardé
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4 mr-1" />
                                                Sauvegarder
                                            </>
                                        )}
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom complet</label>
                                    <Input
                                        value={formData.nom}
                                        onChange={(e) => handleInputChange("nom", e.target.value)}
                                        placeholder="Votre nom complet"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        placeholder="votre.email@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
                                    <Input
                                        value={formData.telephone}
                                        onChange={(e) => handleInputChange("telephone", e.target.value)}
                                        placeholder="+33 6 12 34 56 78"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresse</label>
                                    <Input
                                        value={formData.adresse}
                                        onChange={(e) => handleInputChange("adresse", e.target.value)}
                                        placeholder="Votre adresse"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Résumé professionnel
                                    </label>
                                    <Textarea
                                        value={formData.profil}
                                        onChange={(e) => handleInputChange("profil", e.target.value)}
                                        placeholder="Décrivez votre profil professionnel..."
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expérience</label>
                                    <Textarea
                                        value={formData.experience}
                                        onChange={(e) => handleInputChange("experience", e.target.value)}
                                        placeholder="Décrivez votre expérience professionnelle..."
                                        rows={4}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Formation</label>
                                    <Textarea
                                        value={formData.formation}
                                        onChange={(e) => handleInputChange("formation", e.target.value)}
                                        placeholder="Votre parcours académique..."
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Compétences</label>
                                    <Textarea
                                        value={formData.competences}
                                        onChange={(e) => handleInputChange("competences", e.target.value)}
                                        placeholder="Vos compétences principales..."
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Langues</label>
                                    <Input
                                        value={formData.langues}
                                        onChange={(e) => handleInputChange("langues", e.target.value)}
                                        placeholder="Français (natif), Anglais (courant)..."
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Statistiques</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span>Profil qualité</span>
                                        <span className="font-medium">75%</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Compétences de pointe</span>
                                        <span className="font-medium">85%</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Mise en forme</span>
                                        <span className="font-medium">90%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Conseils de Goriya</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                <p>• Ajoutez des mots-clés spécifiques au poste</p>
                                <p>• Quantifiez vos réalisations avec des chiffres</p>
                                <p>• Personnalisez votre CV pour chaque candidature</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
    )
}
