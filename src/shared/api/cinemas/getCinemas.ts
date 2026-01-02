import { apiClient } from '../client'
import type { IDtoCinemasResponse } from './models'

export async function getCinemas(): Promise<IDtoCinemasResponse> {
  const { data } = await apiClient.get('/cinemas')
  return data as IDtoCinemasResponse
}
