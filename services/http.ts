import type { ApiErrorResponse } from '~/types/api'

export class ApiClientError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'ApiClientError'
    this.statusCode = statusCode
  }
}

function coerceNumber(value: unknown, fallback: number): number {
  const asNumber = typeof value === 'string' ? Number(value) : typeof value === 'number' ? value : NaN
  return Number.isFinite(asNumber) ? asNumber : fallback
}

export type ApiFetch = <T>(path: string, options?: Parameters<typeof $fetch<T>>[1]) => Promise<T>

export function createApiFetcher(baseURL: string) {
  const apiFetch: ApiFetch = async (path, options) => {
    try {
      return await $fetch(path, { ...options, baseURL })
    } catch (error: unknown) {
      const anyError = error as { statusCode?: number; data?: unknown; message?: string }
      const data = anyError?.data as ApiErrorResponse | undefined

      const statusCode = coerceNumber(anyError?.statusCode ?? data?.statusCode, 500)
      const message = data?.message ?? anyError?.message ?? 'Request failed'

      throw new ApiClientError(message, statusCode)
    }
  }
  return apiFetch
}
