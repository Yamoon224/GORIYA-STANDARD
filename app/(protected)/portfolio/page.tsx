"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Image from "next/image"

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      name: "Growthy",
      description: "Site web d'analyse et de vente SaaS",
      image: "/analytics-dashboard.png",
    },
    {
      id: 2,
      name: "Ponna",
      description: "Application de gestion de projet",
      image: "/project-management-app.png",
    },
    {
      id: 3,
      name: "Futura",
      description: "Landing Page pour magasin de meubles",
      image: "/furniture-store-website.jpg",
    },
  ]

  return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Créer un portfolio</h1>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Ajouter
          </Button>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Votre portfolio</h2>
          <p className="text-sm text-gray-600 mb-4">CV</p>

          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      width={80}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
  )
}
