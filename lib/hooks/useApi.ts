"use client"

import { useState, useEffect } from "react"

interface UseApiState<T> {
    data: T | null
    loading: boolean
    error: string | null
}

interface UseApiOptions {
    immediate?: boolean
}

export function useApi<T>(apiCall: () => Promise<T>, options: UseApiOptions = { immediate: true }) {
    const [state, setState] = useState<UseApiState<T>>({
        data: null,
        loading: options.immediate || false,
        error: null,
    })

    const execute = async () => {
        setState((prev) => ({ ...prev, loading: true, error: null }))

        try {
            const result = await apiCall()
            setState({ data: result, loading: false, error: null })
            return result
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue"
            setState({ data: null, loading: false, error: errorMessage })
            throw error
        }
    }

    useEffect(() => {
        if (options.immediate) {
            execute()
        }
    }, [])

    return {
        ...state,
        execute,
        refetch: execute,
    }
}

export function usePaginatedApi<T>(
    apiCall: (page: number, limit: number) => Promise<{ data: T[]; pagination: any }>,
    initialPage = 1,
    limit = 10,
) {
    const [page, setPage] = useState(initialPage)
    const [allData, setAllData] = useState<T[]>([])
    const [pagination, setPagination] = useState<any>(null)

    const { data, loading, error, execute } = useApi(() => apiCall(page, limit), { immediate: true })

    useEffect(() => {
        if (data) {
            if (page === 1) {
                setAllData(data.data)
            } else {
                setAllData((prev) => [...prev, ...data.data])
            }
            setPagination(data.pagination)
        }
    }, [data, page])

    const loadMore = () => {
        if (pagination && page < pagination.totalPages) {
            setPage((prev) => prev + 1)
        }
    }

    const refresh = () => {
        setPage(1)
        setAllData([])
        execute()
    }

    return {
        data: allData,
        pagination,
        loading,
        error,
        loadMore,
        refresh,
        hasMore: pagination ? page < pagination.totalPages : false,
    }
}
