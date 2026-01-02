import { apiClient } from '../client'
import type { IDtoSessionsResponse } from './models'

export async function getSessionsByCinema(cinemaId: number): Promise<IDtoSessionsResponse> {
  const { data } = await apiClient.get(`/cinemas/${cinemaId}/sessions`)
  return data as IDtoSessionsResponse
}
