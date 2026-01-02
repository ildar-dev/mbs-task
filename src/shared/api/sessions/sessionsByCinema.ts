import { apiClient } from '../client'
import type { IDtoSessionsResponse } from './models'

export async function getSessionsByCinema(cinemaId: number): Promise<IDtoSessionsResponse> {
  const { data } = await apiClient.get(`/cinems/${cinemaId}/sessions`)
  return data as IDtoSessionsResponse
}
