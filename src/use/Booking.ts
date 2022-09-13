import { FilterCriteria } from "./FilterCriteria";
import { Booking } from "./../types/Booking";
import { endpoints } from "@/config/endpoints";
import { getData, putData } from "@/infrastructure/ApiHandler";

export function useBooking() {
  const listByEventId = async (eventId: string): Promise<Booking[]> => {
    const bookings = await getData(
      endpoints.v1.booking_list_by_event.replace("{eventId}", eventId)
    );
    return bookings.data as Booking[];
  };

  const listBookingsWithFilter = async (
    filterCriteria: FilterCriteria
  ): Promise<Booking[]> => {
    const bookings = await getData(
      endpoints.v1.booking_list_with_filter,
      filterCriteria
    );
    return bookings.data as Booking[];
  };

  const getBooking = async (bookingId: string): Promise<Booking> => {
    const booking = await getData(
      endpoints.v1.booking_get.replace("{bookingId}", bookingId)
    );
    return booking.data as Booking;
  };

  const updateBookingStatus = async (booking: Booking): Promise<void> => {
    await putData(endpoints.v1.booking_update, {
      booking_id: booking.booking_id,
      status: booking.status,
    });
  };

  return {
    getBooking,
    listByEventId,
    listBookingsWithFilter,
    updateBookingStatus,
  };
}
