import { apiClient } from '../client'
import type { IDtoAuthRequest, IDtoAuthResponse } from './models'

export async function login(request: IDtoAuthRequest): Promise<IDtoAuthResponse> {
  const { data } = await apiClient.post('/login', request)
  return data as IDtoAuthResponse
}

export async function register(request: IDtoAuthRequest): Promise<IDtoAuthResponse> {
  const { data } = await apiClient.post('/register', request)
  return data as IDtoAuthResponse
}
