import { Guest } from './../types/Guest';
import { EventBooking } from '../types/EventBooking';
import { endpoints } from '@/config/endpoints';
import { BookingSession } from '@/types/BookingSession';
import { postData, getData } from '@/infrastructure/ApiHandler';

export function useBookingSession() {
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
