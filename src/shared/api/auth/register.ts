import { apiClient } from '../client'
import type { IDtoAuthRequest, IDtoAuthResponse } from './models'

export async function register(request: IDtoAuthRequest): Promise<IDtoAuthResponse> {
  const { data } = await apiClient.post('/register', request)
  return data as IDtoAuthResponse
}
