import { Booking } from "./../types/Booking";
import { endpoints } from "@/config/endpoints";
import { getData } from "@/infrastructure/ApiHandler";

export interface BookingListFilterCriteria {
  filter: string;
  partner_id?: string;
}

export function useBooking() {
  const listByEventId = async (eventId: string): Promise<Booking[]> => {
    const bookings = await getData(
      endpoints.v1.booking_list_by_event.replace("{eventId}", eventId)
    );
    return bookings.data as Booking[];
  };

  const listWithFilter = async (
    filterCriteria: BookingListFilterCriteria
  ): Promise<Booking[]> => {
    const bookings = await getData(
      endpoints.v1.booking_list_with_filter,
      filterCriteria
    );
    return bookings.data as Booking[];
  };

  const getBooking = async (bookingId: string): Promise<Booking> => {
    const booking: Booking = await getData(
      endpoints.v1.booking_get.replace("{bookingId}", bookingId)
    );
    return booking;
  };

  return {
    getBooking,
    listByEventId,
    listWithFilter,
  };
}
