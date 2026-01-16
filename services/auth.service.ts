import type { LoginDto, User } from '~/types/auth'
import type { ApiFetch } from '~/services/http'
import type { OkResponse } from '~/types/api'

export function createAuthService(apiFetch: ApiFetch) {
  return {
    login: (dto: LoginDto) =>
      apiFetch<User>('/auth/login', {
        method: 'POST',
        body: dto,
      }),
    me: () =>
      apiFetch<User>('/auth/me', {
        method: 'GET',
      }),
    logout: () =>
      apiFetch<OkResponse>('/auth/logout', {
        method: 'POST',
      }),
  }
}
