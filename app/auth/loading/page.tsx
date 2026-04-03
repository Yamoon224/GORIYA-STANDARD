"use client"

import Link from "next/link"
import { useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Page() {
    const router = useRouter()

    useEffect(() => {
        // Simuler un délai de chargement puis rediriger vers les paramètres
        const timer = setTimeout(() => {
            router.push("/auth/settings")
        }, 3000)

        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <div className="p-6">
                <Link href="/auth/signup" className="inline-flex items-center text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    retour
                </Link>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6">
                <div className="text-3xl font-bold text-primary mb-16">goriya</div>

                <div className="flex flex-col items-center space-y-8">
                    {/* Loading Icon */}
                    <div className="relative">
                        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                            <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center">
                                <div className="w-6 h-6 bg-primary rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full animate-bounce"></div>
                    </div>

                    <p className="text-muted-foreground text-center max-w-md">Un instant ! en route pour quelques secondes.</p>
                </div>

                <div className="mt-16">
                    <Button onClick={() => router.push("/auth/settings")} className="bg-primary hover:bg-primary/90 px-8 py-3">
                        Continuer
                    </Button>
                </div>
            </div>
        </div>
    )
}
