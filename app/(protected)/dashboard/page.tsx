"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { candidatureService } from "@/lib/api/candidature.service"
import { companyService } from "@/lib/api/company.service"
import { dashboardService } from "@/lib/api/dashboard.service"
import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardQuickActions } from "@/components/dashboard/dashboard-quick-actions"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardRecentApplications } from "@/components/dashboard/dashboard-recent-applications"
import { DashboardProfileViews } from "@/components/dashboard/dashboard-profile-views"
import { DashboardCompanies } from "@/components/dashboard/dashboard-companies"
import { ICandidature, ICompany } from "@/lib/@types/entities"

export default function Page() {
    const [applications, setApplications] = useState<ICandidature[]>([])
    const [companies, setCompanies] = useState<ICompany[]>([])
    const [stats, setStats] = useState({
        totalApplications: 0,
        interviews: 0,
        profileViews: 0,
    })

    useEffect(() => {
        const fetchDashboardData = async () => {
            const [applicationsRes, companiesRes, statsRes] = await Promise.allSettled([
                candidatureService.getCandidatures(),
                companyService.getRecruitingCompanies(),
                dashboardService.getStats(),
            ])

            if (applicationsRes.status === "fulfilled") setApplications(applicationsRes.value.data ?? [])
            if (companiesRes.status === "fulfilled") setCompanies(companiesRes.value.data ?? [])
            if (statsRes.status === "fulfilled" && statsRes.value?.data) {
                const s = statsRes.value.data
                setStats({
                    totalApplications: s.totalApplications ?? 0,
                    interviews: s.interviews ?? 0,
                    profileViews: s.profileViews ?? 0,
                })
            }
        }
        fetchDashboardData()
    }, [])

    return (
        <ProtectedRoute>
            <div className="p-2 space-y-2">
                    <DashboardHeader />
                    <DashboardQuickActions />
                    <DashboardStats
                        totalApplications={stats.totalApplications}
                        interviews={stats.interviews}
                        profileViews={stats.profileViews}
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <DashboardRecentApplications applications={applications} />
                        <DashboardProfileViews />
                    </div>
                    <DashboardCompanies companies={companies} />
            </div>
        </ProtectedRoute>
    )
}

