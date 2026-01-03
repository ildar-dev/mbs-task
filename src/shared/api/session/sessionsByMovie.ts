import { apiClient } from '../client'
import type { IDtoSessionsResponse } from './models'

export async function getSessionsByMovie(movieId: number): Promise<IDtoSessionsResponse> {
  const { data } = await apiClient.get(`/movies/${movieId}/sessions`)
  return data as IDtoSessionsResponse
}
