import { apiClient } from '../client'
import type { IDtoMoviesResponse } from './models'

export async function getMovies(): Promise<IDtoMoviesResponse> {
  const result = await apiClient.get<IDtoMoviesResponse>('/movies')
  return result.data
}
