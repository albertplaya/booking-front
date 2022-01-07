import { Booking } from './../types/Booking';
import { endpoints } from '@/config/endpoints';

export function useBooking() {
  async function getData(url = ''): Promise<any> {
    const domain: string = 'http://localhost:3000';
    const response = await fetch(domain + url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow'
    });
    return response.json();
  }

  const listByEventId = async (eventId: string): Promise<Booking[]> => {
    const bookings = await getData(
      endpoints.v1.booking_list_by_event.replace('{eventId}', eventId)
    );
    return bookings.data as Booking[];
  };

  const getBooking = async (bookingId: string): Promise<Booking> => {
    const booking: Booking = await getData(
      endpoints.v1.booking_get.replace('{bookingId}', bookingId)
    );
    return booking;
  };

  return {
    getBooking,
    listByEventId
  };
}
