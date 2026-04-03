"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Eye, Wand2, Save, CheckCircle } from "lucide-react"
import { generatePDF, generateDocumentContent, previewDocument, type DocumentData } from "@/lib/document-generator"

const documentTemplates = {
    motivation: {
        title: "Lettre de motivation",
        description: "Créez une lettre de motivation personnalisée et professionnelle",
        fields: [
            { id: "nom", label: "Votre nom complet", type: "text", required: true },
            { id: "titre", label: "Votre titre/profession", type: "text", required: false },
            { id: "destinataire", label: "Nom du destinataire", type: "text", required: false },
            { id: "entreprise", label: "Nom de l'entreprise", type: "text", required: true },
            { id: "poste", label: "Poste visé", type: "text", required: true },
            { id: "date", label: "Date", type: "date", required: false },
        ],
    },
    demission: {
        title: "Lettre de démission",
        description: "Rédigez une lettre de démission professionnelle et courtoise",
        fields: [
            { id: "nom", label: "Votre nom complet", type: "text", required: true },
            { id: "poste", label: "Votre poste actuel", type: "text", required: true },
            { id: "manager", label: "Nom du manager/RH", type: "text", required: false },
            { id: "entreprise", label: "Nom de l'entreprise", type: "text", required: true },
            { id: "dateFin", label: "Date de fin souhaitée", type: "date", required: true },
            { id: "date", label: "Date de la lettre", type: "date", required: false },
        ],
    },
    recommandation: {
        title: "Lettre de recommandation",
        description: "Préparez une lettre de recommandation détaillée",
        fields: [
            { id: "nom", label: "Votre nom complet", type: "text", required: true },
            { id: "poste", label: "Votre poste", type: "text", required: true },
            { id: "candidat", label: "Nom du candidat", type: "text", required: true },
            { id: "posteCandidatActuel", label: "Poste actuel du candidat", type: "text", required: true },
            { id: "posteCandidatVise", label: "Poste visé par le candidat", type: "text", required: false },
            { id: "date", label: "Date", type: "date", required: false },
        ],
    },
}

export default function Page() {
    const params = useParams()
    const documentType = params.type as string
    const template = documentTemplates[documentType as keyof typeof documentTemplates]

    const [formData, setFormData] = useState<DocumentData>({})
    const [generatedContent, setGeneratedContent] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleInputChange = (fieldId: string, value: string) => {
        setFormData((prev) => ({ ...prev, [fieldId]: value }))
        // Clear error when user starts typing
        if (errors[fieldId]) {
            setErrors((prev) => ({ ...prev, [fieldId]: "" }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}

        template.fields.forEach((field) => {
            if (field.required && !formData[field.id]?.trim()) {
                newErrors[field.id] = `${field.label} est requis`
            }
        })

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const generateDocument = async () => {
        if (!validateForm()) return

        setIsGenerating(true)

        // Simulate generation delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const content = generateDocumentContent(documentType, formData)
        setGeneratedContent(content)
        setIsGenerating(false)
    }

    const handleDownloadPDF = () => {
        if (!generatedContent) return

        const filename = `${template.title.toLowerCase().replace(/\s+/g, "-")}-${formData.nom || "document"}.pdf`
        generatePDF(generatedContent, filename)
    }

    const handlePreview = () => {
        if (!generatedContent) return
        previewDocument(generatedContent)
    }

    const handleSave = () => {
        // Simulate save operation
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 2000)
    }

    if (!template) {
        return (
            <div className="max-w-4xl mx-auto">
                <Alert variant="destructive">
                    <AlertDescription>
                        Type de document non trouvé. Veuillez sélectionner un type de document valide.
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{template.title}</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{template.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Section */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                Informations du document
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {template.fields.map((field) => (
                                <div key={field.id}>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {field.label}
                                        {field.required && <span className="text-red-500 ml-1">*</span>}
                                    </label>
                                    {field.id === "description" ? (
                                        <Textarea
                                            value={formData[field.id] || ""}
                                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            placeholder={field.label}
                                            rows={3}
                                            className={errors[field.id] ? "border-red-500" : ""}
                                        />
                                    ) : (
                                        <Input
                                            type={field.type}
                                            value={formData[field.id] || ""}
                                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            placeholder={field.label}
                                            className={errors[field.id] ? "border-red-500" : ""}
                                        />
                                    )}
                                    {errors[field.id] && <p className="text-sm text-red-600 mt-1">{errors[field.id]}</p>}
                                </div>
                            ))}

                            <Button onClick={generateDocument} className="w-full mt-6" disabled={isGenerating}>
                                {isGenerating ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Génération en cours...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-4 h-4 mr-2" />
                                        Générer le document
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Section */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Aperçu du document</span>
                                {generatedContent && (
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaved}>
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
                                    </div>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 min-h-[500px] max-h-[600px] overflow-y-auto">
                                {generatedContent ? (
                                    <div className="whitespace-pre-line text-sm leading-relaxed font-serif">{generatedContent}</div>
                                ) : (
                                    <div className="text-center text-gray-500 py-20">
                                        <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p className="mb-2">Aucun contenu généré</p>
                                        <p className="text-sm">Remplissez le formulaire et cliquez sur "Générer le document"</p>
                                    </div>
                                )}
                            </div>

                            {generatedContent && (
                                <div className="flex gap-3 mt-4">
                                    <Button variant="outline" className="flex-1 bg-transparent" onClick={handlePreview}>
                                        <Eye className="w-4 h-4 mr-2" />
                                        Prévisualiser
                                    </Button>
                                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleDownloadPDF}>
                                        <Download className="w-4 h-4 mr-2" />
                                        Télécharger PDF
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
