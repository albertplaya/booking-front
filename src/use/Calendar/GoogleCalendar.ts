import { Activity } from "./../../types/Activity";
import { endpoints } from "@/config/endpoints";
import { Event } from "@/types/Event";
import { Partner } from "@/types/Partner";
import { deleteData, postData } from "@/infrastructure/ApiHandler";

export function useGoogleCalendar() {
  const insertCalendarEvent = async (
    activity: Activity,
    event: Event,
    partner: Partner
  ): Promise<void> => {
    const payload = {
      title: activity.title,
      start_date: event.start_date,
      duration: event.duration,
      access_token: partner.token,
      time_zone: event.time_zone,
    };
    postData(endpoints.v1.google_calendar, payload);
  };

  const removeCalendarEvent = async (
    activity: Activity,
    event: Event,
    partner: Partner
  ): Promise<void> => {
    const payload = {
      title: activity.title,
      start_date: event.start_date,
      duration: event.duration,
      access_token: partner.token,
      time_zone: event.time_zone,
    };
    deleteData(endpoints.v1.google_calendar, payload);
  };

  const updateCalendarEvent = async (
    activity: Activity,
    event: Event,
    eventUpdated: Event,
    partner: Partner
  ): Promise<void> => {
    await removeCalendarEvent(activity, event, partner);
    insertCalendarEvent(activity, eventUpdated, partner);
  };

  return { insertCalendarEvent, removeCalendarEvent, updateCalendarEvent };
}
