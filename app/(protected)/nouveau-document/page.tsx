"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { useRouter } from "next/navigation"

const documentTypes = [
  {
    id: "motivation",
    title: "Lettre de motivation",
    description: "Rédigez une lettre de motivation personnalisée pour votre candidature",
    icon: "📝",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "demission",
    title: "Lettre de démission",
    description: "Rédigez une lettre de démission professionnelle et courtoise",
    icon: "📋",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "recommandation",
    title: "Lettre de recommandation",
    description: "Préparez une lettre de recommandation pour un collègue ou employé",
    icon: "⭐",
    color: "bg-green-100 text-green-600",
  },
]

export default function NouveauDocumentPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleSelectType = (typeId: string) => {
    setSelectedType(typeId)
    // Navigate to document creation page
    router.push(`/creer-document/${typeId}`)
  }

  return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Nouveau document</h1>
        </div>

        {/* Document Creator Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Créateur de documents</h2>
          <p className="text-gray-600">Choisissez le type de document que vous souhaitez créer</p>
        </div>

        {/* Document Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {documentTypes.map((type) => (
            <Card
              key={type.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleSelectType(type.id)}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 ${type.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">{type.icon}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{type.title}</h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
  )
}
