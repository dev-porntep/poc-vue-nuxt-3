import { describe, expect, it, vi } from 'vitest'
import { ApiClientError, createApiFetcher } from '~/services/http'

describe('createApiFetcher', () => {
  it('maps fetch error to ApiClientError', async () => {
    const g = globalThis as unknown as { $fetch: unknown }
    g.$fetch = vi.fn().mockRejectedValue({
      statusCode: 401,
      data: { message: 'Unauthorized', statusCode: 401 },
      message: 'Fetch failed',
    })

    const api = createApiFetcher('/api')
    await expect(api('/auth/me')).rejects.toBeInstanceOf(ApiClientError)
    await expect(api('/auth/me')).rejects.toMatchObject({ statusCode: 401 })
  })
})
