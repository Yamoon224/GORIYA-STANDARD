"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Calendar, MapPin, Eye, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { candidatureService } from "@/lib/api/candidature.service"
import { useApi } from "@/lib/hooks/useApi"

export default function MyApplicationsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const {
    data: applications,
    loading,
    error,
    refetch,
  } = useApi(() => candidatureService.getCandidatures(selectedStatus === "all" ? undefined : selectedStatus), {
    immediate: true,
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800" },
      reviewed: { label: "Examiné", className: "bg-blue-100 text-blue-800" },
      interview: { label: "Entretien", className: "bg-purple-100 text-purple-800" },
      accepted: { label: "Accepté", className: "bg-green-100 text-green-800" },
      rejected: { label: "Refusé", className: "bg-red-100 text-red-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const displayApplications = (applications?.data as any[]) || []

  return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Mes candidatures</h1>
          <p className="text-gray-600">Suivez l'état de vos candidatures et gérez vos offres</p>
        </div>

        <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="pending">En attente</TabsTrigger>
            <TabsTrigger value="reviewed">Examinées</TabsTrigger>
            <TabsTrigger value="interview">Entretiens</TabsTrigger>
            <TabsTrigger value="accepted">Acceptées</TabsTrigger>
            <TabsTrigger value="rejected">Refusées</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedStatus} className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : displayApplications.length > 0 ? (
              displayApplications.map((application: any) => (
                <Card key={application.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{application.jobTitle}</h3>
                          <p className="text-gray-600 mb-2">{application.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {application.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Candidature envoyée le {application.appliedDate}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{application.type}</Badge>
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              {application.salary}
                            </Badge>
                            {getStatusBadge(application.status)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune candidature trouvée</h3>
                  <p className="text-gray-600 mb-4">
                    {selectedStatus === "all"
                      ? "Vous n'avez pas encore postulé à des offres d'emploi."
                      : `Aucune candidature avec le statut "${selectedStatus}".`}
                  </p>
                  <Button>Parcourir les offres</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
  )
}
