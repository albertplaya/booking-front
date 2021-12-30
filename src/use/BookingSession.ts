import { Guest } from './../types/Guest';
import { EventBooking } from '../types/EventBooking';
import { endpoints } from '@/config/endpoints';
import { BookingSession } from '@/types/BookingSession';

export function useBookingSession() {
  async function postData(url = '', data = {}) {
    const domain: string = 'http://localhost:3000';
    const response = await fetch(domain + url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify(data)
    });
    return response.json();
  }

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

  const initBookingSession = async (eventId: string): Promise<void> => {
    postData(endpoints.v1.booking_init, {
      event_id: eventId
    }).then((bookingId: any) => {
      localStorage.setItem('booking_id', bookingId.data.booking_id.value);
    });
  };

  const addGuest = async (eventId: string, guest: Guest): Promise<any> => {
    const bookingSession: BookingSession = {
      booking_id: localStorage.getItem('booking_id') as string,
      event_id: eventId,
      guest: guest
    };
    postData(endpoints.v1.booking_add_guest, bookingSession);
  };

  const finishBookingSession = async (eventId: string): Promise<void> => {
    postData(endpoints.v1.booking_finish, {
      event_id: eventId,
      booking_id: localStorage.getItem('booking_id')
    }).then(() => {
      localStorage.removeItem('booking_id');
    });
  };

  return {
    getEvent,
    initBookingSession,
    addGuest,
    finishBookingSession
  };
}
