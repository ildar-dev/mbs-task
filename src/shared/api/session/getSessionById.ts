import { apiClient } from '../client'
import type { IDtoSessionDetails } from './models'

export async function getSessionById(sessionId: number): Promise<IDtoSessionDetails> {
  const { data } = await apiClient.get(`/movieSessions/${sessionId}`)
  return data as IDtoSessionDetails
}
