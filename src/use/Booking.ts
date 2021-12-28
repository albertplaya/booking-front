import { EventBooking } from './../types/EventBooking';
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

  const getEvent = async (eventId: string): Promise<EventBooking> => {
    const eventBooking: EventBooking = await getData(
      endpoints.v1.booking_event.replace('{eventId}', eventId)
    );
    return eventBooking;
  };

  return {
    getEvent
  };
}