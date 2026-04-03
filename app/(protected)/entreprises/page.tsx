"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Building2, Users, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { companyService } from "@/lib/api/company.service"
import { useState, useEffect } from "react"

interface Company {
    id: string
    name: string
    industry: string
    location: string
    employees: string
    openPositions: number
    description: string
    logo: string
    featured: boolean
}

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([])
    const [filters, setFilters] = useState({
        search: "",
        industry: [] as string[],
        size: [] as string[],
        location: [] as string[],
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages] = useState(5)

    useEffect(() => {
        fetchCompanies()
    }, [filters, currentPage])

    const fetchCompanies = async () => {
        try {
            const response = await companyService.getCompanies({ ...filters, page: currentPage })
            setCompanies(response.data as unknown as Company[])
        } catch (error) {
            console.error("Erreur lors du chargement des entreprises:", error)
            setCompanies([])
        }
    }

    const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: checked
                ? [...(prev[filterType as keyof typeof prev] as string[]), value]
                : (prev[filterType as keyof typeof prev] as string[]).filter((item) => item !== value),
        }))
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">Parcourir les entreprises</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            placeholder="Recherchez un emploi par intitulé, poste, mot clé ou entreprise..."
                            className="pl-10"
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">Trouver un emploi</Button>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Filters Sidebar */}
                <div className="w-64 space-y-6">
                    <div>
                        <h3 className="font-semibold text-foreground mb-3">Industrie et services</h3>
                        <div className="space-y-2">
                            {["Technologie (4)", "Marketing (3)", "Finance (2)", "Santé (1)"].map((industry) => (
                                <div key={industry} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={industry}
                                        onCheckedChange={(checked) => handleFilterChange("industry", industry, checked as boolean)}
                                    />
                                    <Label htmlFor={industry} className="text-sm text-muted-foreground">
                                        {industry}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-foreground mb-3">Taille de l'entreprise</h3>
                        <div className="space-y-2">
                            {["1-10 (2)", "11-50 (3)", "51-200 (4)", "201-1000 (2)", "1000+ (3)"].map((size) => (
                                <div key={size} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={size}
                                        onCheckedChange={(checked) => handleFilterChange("size", size, checked as boolean)}
                                    />
                                    <Label htmlFor={size} className="text-sm text-muted-foreground">
                                        {size}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-foreground mb-3">Localisation</h3>
                        <div className="space-y-2">
                            {["Paris (4)", "Lyon (2)", "Marseille (1)", "International (5)"].map((location) => (
                                <div key={location} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={location}
                                        onCheckedChange={(checked) => handleFilterChange("location", location, checked as boolean)}
                                    />
                                    <Label htmlFor={location} className="text-sm text-muted-foreground">
                                        {location}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-foreground mb-3">Tous les filtres</h3>
                        <div className="space-y-2">
                            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                                Type d'entreprise
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                                Année de création
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                                Financement
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Company Results */}
                <div className="flex-1">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-muted-foreground">
                            Toutes les entreprises{" "}
                            <span className="font-medium text-foreground">({companies.length} résultats)</span>
                        </p>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">Trier par pertinence</span>
                            <Button variant="ghost" size="sm">
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {companies.map((company) => (
                            <Card key={company.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                                <Building2 className="w-6 h-6 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground">{company.name}</h3>
                                                <p className="text-sm text-muted-foreground">{company.industry}</p>
                                            </div>
                                        </div>
                                        {company.featured && <Badge className="bg-primary/10 text-primary text-xs">Recommandé</Badge>}
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            {company.location}
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Users className="w-4 h-4 mr-2" />
                                            {company.employees} employés
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{company.description}</p>

                                    <div className="flex items-center justify-between">
                                        <Badge
                                            variant="outline"
                                            className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
                                        >
                                            {company.openPositions} postes ouverts
                                        </Badge>
                                        <div className="flex space-x-2">
                                            <Button size="sm" variant="outline">
                                                Suivre
                                            </Button>
                                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                                Voir les offres
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>

                        {[1, 2, 3, 4, 5].map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className={currentPage === page ? "bg-blue-600 hover:bg-blue-700" : ""}
                            >
                                {page}
                            </Button>
                        ))}

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
