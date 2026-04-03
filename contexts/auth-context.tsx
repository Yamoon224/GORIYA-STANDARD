"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { IUser } from "@/lib/@types/entities"
import { authService } from "@/lib/api/auth.service"

interface AuthContextType {
    user: IUser | null
    isLoading: boolean
    login: (userData: IUser, token: string) => void
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem("auth")
        if (stored) {
            try {
                const { user: savedUser } = JSON.parse(stored)
                setUser(savedUser)
            } catch {
                localStorage.removeItem("auth")
            }
        }
        setIsLoading(false)
    }, [])

    const login = (userData: IUser, token: string) => {
        setUser(userData)
        const auth = { token, user: userData }
        localStorage.setItem("auth", JSON.stringify(auth))
        document.cookie = `auth=${JSON.stringify(auth)}; path=/`
    }

    const logout = async () => {
        try {
            await authService.logout()
        } catch {}
        setUser(null)
        localStorage.removeItem("auth")
        document.cookie = "auth=; path=/; max-age=0"
        window.location.href = "/auth/signin"
    }

    const value = {
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
