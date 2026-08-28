import { http } from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { Booking, BookingFormValues } from "../model/booking.types";

/** Create a viewing booking. The server assigns `id` and `createdAt`
 *  (BACKEND_TASK §9), so only the form values are sent. */
export async function createBooking(values: BookingFormValues): Promise<Booking> {
  const { data } = await http.post<Booking>(ENDPOINTS.bookings, values);
  return data;
}

export async function listBookings(): Promise<Booking[]> {
  const { data } = await http.get<Booking[]>(ENDPOINTS.bookings);
  return data;
}
