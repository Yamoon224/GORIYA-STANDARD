import { ApiResponse } from "@/lib/@types/api"
import { apiRequest } from "@/lib/api-client-http"
import { ICandidature } from "@/lib/@types/entities"

export const candidatureService = {
    getCandidatures: async (status?: string) => {
        return apiRequest<ApiResponse<ICandidature[]>>({
            endpoint: "/candidatures/paginate",
            method: "GET",
            params: status ? { status } : undefined,
        })
    },

    getCandidatureById: async (id: string) => {
        return apiRequest<ApiResponse<ICandidature>>({
            endpoint: `/candidatures/${id}`,
            method: "GET",
        })
    },

    withdrawCandidature: async (id: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/candidatures/${id}`,
            method: "DELETE",
        })
    },
}
