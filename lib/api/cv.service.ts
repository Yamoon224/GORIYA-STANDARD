import { ApiResponse } from "@/lib/@types/api"
import { apiRequest } from "@/lib/api-client-http"

export const cvService = {
    analyzeCV: async (cvData: FormData) => {
        return apiRequest<
            ApiResponse<{
                score: number
                suggestions: string[]
                strengths: string[]
                improvements: string[]
            }>
        >({
            endpoint: "/cv/analyze",
            method: "POST",
            data: cvData,
        })
    },

    uploadCV: async (file: File) => {
        const formData = new FormData()
        formData.append("cv", file)
        return apiRequest<ApiResponse<{ cvUrl: string }>>({
            endpoint: "/cv/upload",
            method: "POST",
            data: formData,
        })
    },
}
