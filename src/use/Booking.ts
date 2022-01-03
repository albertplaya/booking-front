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

  const getBooking = async (bookingId: string): Promise<Booking> => {
    const booking: Booking = await getData(
      endpoints.v1.booking_get.replace('{bookingId}', bookingId)
    );
    return booking;
  };

  return {
    getBooking
  };
}
