import { apiRequest } from "@/lib/api-client-http"
import { ApiResponse, IPaginatedResponse } from "@/lib/@types/api"
import { ICompany, IJobOffer } from "@/lib/@types/entities"

export const companyService = {
    getCompanies: async (
        filters?: {
            search?: string
            industry?: string[]
            size?: string[]
            location?: string[]
            page?: number
            limit?: number
        },
    ) => {
        return apiRequest<IPaginatedResponse<ICompany>>({
            endpoint: "/companies",
            method: "GET",
            params: filters,
        })
    },

    getCompanyById: async (id: string) => {
        return apiRequest<ApiResponse<ICompany>>({
            endpoint: `/companies/${id}`,
            method: "GET",
        })
    },

    followCompany: async (companyId: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/companies/${companyId}/follow`,
            method: "POST",
        })
    },

    unfollowCompany: async (companyId: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/companies/${companyId}/follow`,
            method: "DELETE",
        })
    },

    getRecruitingCompanies: async () => {
        return apiRequest<ApiResponse<ICompany[]>>({
            endpoint: "/companies/recruiting",
            method: "GET",
        })
    },

    getCompanyJobs: async (companyId: string) => {
        return apiRequest<ApiResponse<IJobOffer[]>>({
            endpoint: `/companies/${companyId}/jobs`,
            method: "GET",
        })
    },
}
