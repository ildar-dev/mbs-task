import { apiClient } from './client'

export type AuthResponse = {
  token: string
}

export type AuthRequest = {
  username: string
  password: string
}

export async function login(request: AuthRequest): Promise<AuthResponse> {
  const { data } = await apiClient.post('/login', request)
  return data as AuthResponse
}

export async function register(request: AuthRequest): Promise<AuthResponse> {
  const { data } = await apiClient.post('/register', request)
  return data as AuthResponse
}


