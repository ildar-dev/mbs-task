import { getBookingsList as apiGetBookingsList } from '@/shared/api/bookings/getBookingList'
import { fromDto as mapBooking } from '@/entities/booking/mappers/fromDto'
import type { IBooking } from '@/entities/booking/models/booking'

export async function getBookingList(): Promise<IBooking[]> {
  const dtoList = await apiGetBookingsList()
  return dtoList.map(mapBooking)
}

