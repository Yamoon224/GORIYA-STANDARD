// Utilitaires pour le stockage local
export const storage = {
    // Token d'authentification
    getToken: (): string | null => {
        if (typeof window === "undefined") return null
        return localStorage.getItem("goriya_token")
    },

    setToken: (token: string): void => {
        if (typeof window === "undefined") return
        localStorage.setItem("goriya_token", token)
    },

    removeToken: (): void => {
        if (typeof window === "undefined") return
        localStorage.removeItem("goriya_token")
    },

    // Données utilisateur
    getUser: (): any | null => {
        if (typeof window === "undefined") return null
        const user = localStorage.getItem("goriya_user")
        return user ? JSON.parse(user) : null
    },

    setUser: (user: any): void => {
        if (typeof window === "undefined") return
        localStorage.setItem("goriya_user", JSON.stringify(user))
    },

    removeUser: (): void => {
        if (typeof window === "undefined") return
        localStorage.removeItem("goriya_user")
    },

    // Préférences utilisateur
    getPreferences: (): any => {
        if (typeof window === "undefined") return {}
        const prefs = localStorage.getItem("goriya_preferences")
        return prefs ? JSON.parse(prefs) : {}
    },

    setPreferences: (preferences: any): void => {
        if (typeof window === "undefined") return
        localStorage.setItem("goriya_preferences", JSON.stringify(preferences))
    },

    // Recherches sauvegardées
    getSavedSearches: (): any[] => {
        if (typeof window === "undefined") return []
        const searches = localStorage.getItem("goriya_saved_searches")
        return searches ? JSON.parse(searches) : []
    },

    addSavedSearch: (search: any): void => {
        if (typeof window === "undefined") return
        const searches = storage.getSavedSearches()
        const updatedSearches = [search, ...searches.filter((s) => s.id !== search.id)].slice(0, 10)
        localStorage.setItem("goriya_saved_searches", JSON.stringify(updatedSearches))
    },

    removeSavedSearch: (searchId: string): void => {
        if (typeof window === "undefined") return
        const searches = storage.getSavedSearches()
        const updatedSearches = searches.filter((s) => s.id !== searchId)
        localStorage.setItem("goriya_saved_searches", JSON.stringify(updatedSearches))
    },

    // Nettoyage complet
    clearAll: (): void => {
        if (typeof window === "undefined") return
        localStorage.removeItem("goriya_token")
        localStorage.removeItem("goriya_user")
        localStorage.removeItem("goriya_preferences")
        localStorage.removeItem("goriya_saved_searches")
    },
}
