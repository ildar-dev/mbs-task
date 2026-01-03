import { apiClient } from '../client'
import type { IDtoCheckoutRequest, IDtoCheckoutResponse } from './models/checkout';

export const checkout = async (sessionId: number, payload: IDtoCheckoutRequest): Promise<IDtoCheckoutResponse> => {
  const response = await apiClient.post<IDtoCheckoutResponse>(`/movieSessions/${sessionId}/bookings`, payload)
  return response.data
}
