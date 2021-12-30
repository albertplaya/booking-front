import { Guest } from './Guest';
export interface BookingSession {
  booking_id: string;
  event_id: string;
  guest: Guest;
}
