import { Guest } from "./Guest";
export interface Booking {
  booking_id: string;
  event_id: string;
  status: string;
  email: string;
  title: string;
  start_date: string;
  duration: number;
  price: number;
  guest: Guest;
  source: string;
  type: string;
}
