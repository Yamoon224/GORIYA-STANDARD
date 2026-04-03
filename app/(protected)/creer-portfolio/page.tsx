"use client"

import type React from "react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Plus, Eye, Edit, Trash2, Upload, X, CheckCircle } from "lucide-react"

interface PortfolioItem {
    id: string
    title: string
    description: string
    image: string
    category: string
    technologies: string[]
    url?: string
    githubUrl?: string
    createdAt: string
}

interface PortfolioFormData {
    title: string
    description: string
    category: string
    technologies: string
    url: string
    githubUrl: string
}

export default function Page() {
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
        {
            id: "1",
            title: "Growthy",
            description: "Site web d'analyse et de vente SaaS avec dashboard interactif et système de paiement intégré",
            image: "/analytics-dashboard.png",
            category: "Web Development",
            technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
            url: "https://growthy.example.com",
            githubUrl: "https://github.com/user/growthy",
            createdAt: "2024-01-15",
        },
        {
            id: "2",
            title: "Ponna",
            description: "Application mobile de gestion de projet avec collaboration en temps réel",
            image: "/project-management-app.png",
            category: "Mobile App",
            technologies: ["React Native", "Node.js", "MongoDB", "Socket.io"],
            url: "https://ponna.example.com",
            createdAt: "2024-02-20",
        },
        {
            id: "3",
            title: "Futura",
            description: "Landing page moderne pour magasin de meubles avec catalogue interactif",
            image: "/furniture-store-website.jpg",
            category: "Design",
            technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
            url: "https://futura.example.com",
            createdAt: "2024-03-10",
        },
    ])

    const [showModal, setShowModal] = useState(false)
    const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add")
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
    const [formData, setFormData] = useState<PortfolioFormData>({
        title: "",
        description: "",
        category: "",
        technologies: "",
        url: "",
        githubUrl: "",
    })
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")
    const [errors, setErrors] = useState<Record<string, string>>({})

    const categories = ["Web Development", "Mobile App", "Design", "Data Science", "DevOps", "E-commerce", "Other"]

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            category: "",
            technologies: "",
            url: "",
            githubUrl: "",
        })
        setSelectedImage(null)
        setImagePreview("")
        setErrors({})
    }

    const openAddModal = () => {
        resetForm()
        setModalMode("add")
        setSelectedItem(null)
        setShowModal(true)
    }

    const openEditModal = (item: PortfolioItem) => {
        setFormData({
            title: item.title,
            description: item.description,
            category: item.category,
            technologies: item.technologies.join(", "),
            url: item.url || "",
            githubUrl: item.githubUrl || "",
        })
        setImagePreview(item.image)
        setSelectedItem(item)
        setModalMode("edit")
        setErrors({})
        setShowModal(true)
    }

    const openViewModal = (item: PortfolioItem) => {
        setSelectedItem(item)
        setModalMode("view")
        setShowModal(true)
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors({ ...errors, image: "L'image ne doit pas dépasser 5MB" })
                return
            }

            setSelectedImage(file)
            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
            setErrors({ ...errors, image: "" })
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!formData.title.trim()) {
            newErrors.title = "Le titre est requis"
        }
        if (!formData.description.trim()) {
            newErrors.description = "La description est requise"
        }
        if (!formData.category) {
            newErrors.category = "La catégorie est requise"
        }
        if (!formData.technologies.trim()) {
            newErrors.technologies = "Les technologies sont requises"
        }
        if (modalMode === "add" && !selectedImage && !imagePreview) {
            newErrors.image = "Une image est requise"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (!validateForm()) return

        const newItem: PortfolioItem = {
            id: modalMode === "add" ? Date.now().toString() : selectedItem!.id,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            technologies: formData.technologies.split(",").map((tech) => tech.trim()),
            url: formData.url,
            githubUrl: formData.githubUrl,
            image: imagePreview || selectedItem?.image || "/placeholder.svg",
            createdAt: modalMode === "add" ? new Date().toISOString().split("T")[0] : selectedItem!.createdAt,
        }

        if (modalMode === "add") {
            setPortfolioItems([newItem, ...portfolioItems])
        } else {
            setPortfolioItems(portfolioItems.map((item) => (item.id === selectedItem!.id ? newItem : item)))
        }

        setShowModal(false)
        resetForm()
    }

    const handleDelete = (id: string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
            setPortfolioItems(portfolioItems.filter((item) => item.id !== id))
        }
    }

    const closeModal = () => {
        setShowModal(false)
        resetForm()
        setSelectedItem(null)
    }

    return (
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Mon Portfolio</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">Gérez vos projets et réalisations</p>
                    </div>
                    <Button onClick={openAddModal} className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Ajouter un projet
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Vos projets ({portfolioItems.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {portfolioItems.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Plus className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun projet</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">Commencez par ajouter votre premier projet</p>
                                <Button onClick={openAddModal}>Ajouter un projet</Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {portfolioItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <div className="w-20 h-12 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.title}
                                                width={80}
                                                height={48}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                                                <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">
                                                    {item.category}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{item.description}</p>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {item.technologies.slice(0, 3).map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {item.technologies.length > 3 && (
                                                    <span className="text-xs text-gray-500">+{item.technologies.length - 3}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => openViewModal(item)}>
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => openEditModal(item)}>
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Modal */}
                <Dialog open={showModal} onOpenChange={closeModal}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {modalMode === "add" && "Ajouter un projet"}
                                {modalMode === "edit" && "Modifier le projet"}
                                {modalMode === "view" && "Détails du projet"}
                            </DialogTitle>
                        </DialogHeader>

                        {modalMode === "view" && selectedItem ? (
                            <div className="space-y-6">
                                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                    <Image
                                        src={selectedItem.image || "/placeholder.svg"}
                                        alt={selectedItem.title}
                                        width={600}
                                        height={300}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{selectedItem.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedItem.description}</p>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <Label className="text-sm font-medium">Catégorie</Label>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">{selectedItem.category}</p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium">Date de création</Label>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">{selectedItem.createdAt}</p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <Label className="text-sm font-medium">Technologies utilisées</Label>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {selectedItem.technologies.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {(selectedItem.url || selectedItem.githubUrl) && (
                                        <div className="flex gap-2">
                                            {selectedItem.url && (
                                                <Button variant="outline" size="sm" asChild>
                                                    <a href={selectedItem.url} target="_blank" rel="noopener noreferrer">
                                                        Voir le projet
                                                    </a>
                                                </Button>
                                            )}
                                            {selectedItem.githubUrl && (
                                                <Button variant="outline" size="sm" asChild>
                                                    <a href={selectedItem.githubUrl} target="_blank" rel="noopener noreferrer">
                                                        Code source
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="title">Titre du projet *</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="Nom du projet"
                                        />
                                        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="category">Catégorie *</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner une catégorie" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="description">Description *</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Description détaillée du projet"
                                        rows={3}
                                    />
                                    {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="technologies">Technologies utilisées *</Label>
                                    <Input
                                        id="technologies"
                                        value={formData.technologies}
                                        onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                        placeholder="React, Next.js, TypeScript, etc. (séparées par des virgules)"
                                    />
                                    {errors.technologies && <p className="text-sm text-red-600 mt-1">{errors.technologies}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="url">URL du projet</Label>
                                        <Input
                                            id="url"
                                            value={formData.url}
                                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                            placeholder="https://monprojet.com"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="githubUrl">URL GitHub</Label>
                                        <Input
                                            id="githubUrl"
                                            value={formData.githubUrl}
                                            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                            placeholder="https://github.com/user/repo"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label>Image du projet *</Label>
                                    <div className="mt-2">
                                        {imagePreview ? (
                                            <div className="relative">
                                                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={imagePreview || "/placeholder.svg"}
                                                        alt="Preview"
                                                        width={400}
                                                        height={200}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute top-2 right-2 bg-white dark:bg-gray-800 shadow-md"
                                                    onClick={() => {
                                                        setImagePreview("")
                                                        setSelectedImage(null)
                                                    }}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                                    Glissez une image ici ou cliquez pour sélectionner
                                                </p>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => document.getElementById("image-upload")?.click()}
                                                >
                                                    Choisir une image
                                                </Button>
                                            </div>
                                        )}
                                        <input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                        {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        <DialogFooter>
                            <Button variant="outline" onClick={closeModal}>
                                {modalMode === "view" ? "Fermer" : "Annuler"}
                            </Button>
                            {modalMode !== "view" && (
                                <Button onClick={handleSubmit}>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    {modalMode === "add" ? "Ajouter" : "Modifier"}
                                </Button>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
    )
}
