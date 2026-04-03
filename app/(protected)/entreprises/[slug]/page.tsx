"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { MapPin, Clock, Heart, Globe, Phone, Mail, Linkedin } from "lucide-react"
import { companyService } from "@/lib/api/company.service"

export default function CompanyProfilePage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState("jobs")
  const [company, setCompany] = useState<any>(null)
  const [companyJobs, setCompanyJobs] = useState<any[]>([])

  useEffect(() => {
    companyService.getCompanyById(params.slug)
      .then((res) => {
        const data = res.data as any
        setCompany(data)
        return companyService.getCompanyJobs(data.id || params.slug)
      })
      .then((res) => setCompanyJobs((res.data as any[]) || []))
      .catch(() => {})
  }, [params.slug])

  if (!company) {
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
            src={company.coverImage || "/placeholder.svg"}
            alt={`${company.name} office`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Company Info Overlay */}
          <div className="absolute bottom-6 left-6 flex items-center gap-4">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
              <img
                src={company.logo || "/placeholder.svg"}
                alt={`${company.name} logo`}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">{company.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {company.sector}
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="w-4 h-4" />
                  {company.location}
                </div>
              </div>
            </div>

            <div className="ml-auto flex gap-2">
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Suivre
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Voir les offres</Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4 max-w-md">
              <TabsTrigger value="jobs">Profil</TabsTrigger>
              <TabsTrigger value="jobs" className="bg-blue-600 text-white data-[state=active]:bg-blue-700">
                Jobs
              </TabsTrigger>
              <TabsTrigger value="presentation">Présentation</TabsTrigger>
              <TabsTrigger value="team">Équipe</TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="space-y-6">
              {/* Job Listings */}
              <div className="space-y-4">
                {companyJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <Link href={`/emploi/${job.id}`} className="hover:underline">
                                <h3 className="font-semibold text-lg text-foreground mb-1">{job.title}</h3>
                              </Link>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {job.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {job.duration}
                                </div>
                                <Badge variant="secondary">{job.type}</Badge>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden">
                          <img
                            src={job.image || "/placeholder.svg"}
                            alt="Job preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="presentation" className="space-y-8">
              {/* Presentation Section */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Présentation</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{company.presentation.description}</p>
                <ul className="space-y-3">
                  {company.presentation.points.map((point: any, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What they're looking for */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Ce qu'ils recherchent</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{company.recherche.description}</p>
                <ul className="space-y-3 mb-6">
                  {company.recherche.points.map((point: any, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <strong>{point.split(":")[0]}:</strong> {point.split(":")[1]}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground italic">{company.recherche.note}</p>
              </div>

              {/* Culture and Values */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Culture et valeur</h2>
                <ul className="space-y-3">
                  {company.culture.values.map((value: any, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <span className="text-muted-foreground">{company.contact.website}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span className="text-muted-foreground">{company.contact.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span className="text-muted-foreground">{company.contact.phone}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span className="text-muted-foreground">{company.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-5 h-5 text-blue-600" />
                      <span className="text-muted-foreground">{company.contact.linkedin}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-muted-foreground mb-4">Suivez-nous sur</p>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-8">
              {/* Team Photos */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Notre équipe</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {company.team.map((image: any, index: number) => (
                    <div key={index} className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Team ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Similar Companies */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Autres entreprises que vous pouvez consulter
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {company.similarCompanies.map((similarCompany: any, index: number) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <img
                              src={similarCompany.logo || "/placeholder.svg"}
                              alt={`${similarCompany.name} logo`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{similarCompany.name}</h3>
                            <p className="text-sm text-muted-foreground">{similarCompany.sector}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {similarCompany.offers}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">{similarCompany.location}</p>

                        <div className="flex gap-2">
                          {similarCompany.tags.map((tag: any, tagIndex: number) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
