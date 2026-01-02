import { apiClient } from '../client'
import type { IDtoMoviesResponse } from './models'

export async function getMovies(): Promise<IDtoMoviesResponse> {
  const { data } = await apiClient.get('/movies')
  return data as IDtoMoviesResponse
}
