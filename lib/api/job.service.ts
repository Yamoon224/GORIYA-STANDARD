import { apiRequest } from "@/lib/api-client-http"
import { ApiResponse, IPaginatedResponse } from "@/lib/@types/api"
import { ICandidature, IJobOffer } from "@/lib/@types/entities"

export const jobService = {
    getJobs: async (
        filters?: {
            search?: string
            location?: string
            jobType?: string[]
            experience?: string[]
            salary?: string[]
            page?: number
            limit?: number
        },
    ) => {
        return apiRequest<IPaginatedResponse<IJobOffer>>({
            endpoint: "/jobs",
            method: "GET",
            params: filters,
        })
    },

    getJobById: async (id: string) => {
        return apiRequest<ApiResponse<IJobOffer>>({
            endpoint: `/jobs/${id}`,
            method: "GET",
        })
    },

    applyToJob: async (
        jobId: string,
        applicationData: { coverLetter?: string; resumeUrl?: string },
    ) => {
        return apiRequest<ApiResponse<ICandidature>>({
            endpoint: `/jobs/${jobId}/apply`,
            method: "POST",
            data: applicationData,
        })
    },

    saveJob: async (jobId: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/jobs/${jobId}/save`,
            method: "POST",
        })
    },

    unsaveJob: async (jobId: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/jobs/${jobId}/save`,
            method: "DELETE",
        })
    },
}
