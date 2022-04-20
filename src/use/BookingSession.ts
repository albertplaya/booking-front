import { ulid } from "ulid";
import { Guest } from "./../types/Guest";
import { EventBooking } from "../types/EventBooking";
import { endpoints } from "@/config/endpoints";
import { BookingSession } from "@/types/BookingSession";
import { postData, getData } from "@/infrastructure/ApiHandler";

export function useBookingSession() {
  const getEvent = async (eventId: string): Promise<EventBooking> => {
    const eventBooking: EventBooking = await getData(
      endpoints.v1.booking_event.replace("{eventId}", eventId)
    );
    return eventBooking;
  };

  const initBookingSession = async (eventId: string): Promise<void> => {
    if (alreadyHasBookingSession()) {
      return;
    }

    const bookingId: string = ulid();
    postData(endpoints.v1.booking_init, {
      booking_id: bookingId,
      event_id: eventId,
    }).then(() => {
      localStorage.setItem("booking_id", bookingId);
      localStorage.setItem("booking_session", Date.now().toString());
    });
  };

  const addGuest = async (eventId: string, guest: Guest): Promise<any> => {
    const bookingSession: BookingSession = {
      booking_id: localStorage.getItem("booking_id") as string,
      event_id: eventId,
      guest: guest,
    };
    await postData(endpoints.v1.booking_add_guest, bookingSession);
  };

  const finishBookingSession = async (eventId: string): Promise<string> => {
    const bookingId = localStorage.getItem("booking_id") as string;
    await postData(endpoints.v1.booking_finish, {
      event_id: eventId,
      booking_id: bookingId,
    }).then(() => {
      localStorage.removeItem("booking_id");
      localStorage.removeItem("booking_session");
    });
    return bookingId;
  };

  const alreadyHasBookingSession = (): boolean => {
    return (
      localStorage.getItem("booking_session") !== null &&
      Date.now() - Number(localStorage.getItem("booking_session")) < 900000
    );
  };

  return {
    getEvent,
    initBookingSession,
    addGuest,
    finishBookingSession,
  };
}
