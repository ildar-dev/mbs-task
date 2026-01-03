import { apiClient } from '../client'
import type { IDtoBooking } from './models/bookings'

export async function getBookingsList(): Promise<IDtoBooking[]> {
  const result = await apiClient.get<IDtoBooking[]>('my//bookings');
  return result.data;
}
