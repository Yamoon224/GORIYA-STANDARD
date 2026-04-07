import "./globals.css"
import type React from "react"
import { Suspense } from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "sonner"

export const metadata: Metadata = {
    title: "Goriya - Plateforme de recrutement",
    description: "Trouvez votre emploi idéal avec Goriya",
    // generator: "v0.app",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <Suspense fallback={null}>
                            {children}
                        </Suspense>
                    </AuthProvider>
                </ThemeProvider>
                <Analytics />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        className: "text-sm",
                    }}
                    richColors
                />
            </body>
        </html>
    )
}