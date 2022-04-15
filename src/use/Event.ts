import { Event } from "@/types/Event";
import { endpoints } from "@/config/endpoints";
import {
  postData,
  getData,
  putData,
  deleteData,
} from "@/infrastructure/ApiHandler";

export function useEvent() {
  const create = (event: Event): Promise<Event> => {
    const payload = {
      start_date: event.start_date,
      duration: event.duration,
      capacity: event.capacity,
      activity_id: event.activity_id,
    };

    const activity_res: Promise<Event> = postData(
      endpoints.v1.event_create,
      payload
    );
    return activity_res;
  };

  const listUpcomming = async (activityId: string): Promise<Event[]> => {
    const payload = {
      time: "future",
    };

    const events = await getData(
      endpoints.v1.event_list.replace("{activityId}", activityId),
      payload
    );
    return events.data as Event[];
  };

  const listPast = async (activityId: string): Promise<Event[]> => {
    const payload = {
      time: "past",
    };
    const events = await getData(
      endpoints.v1.event_list.replace("{activityId}", activityId),
      payload
    );
    return events.data as Event[];
  };

  const get = async (eventId: string): Promise<Event> => {
    const getEvent = await getData(
      endpoints.v1.event_get.replace("{eventId}", eventId)
    );
    return getEvent.data as Event;
  };

  const update = async (event: Event): Promise<Event> => {
    const eventResult: Promise<Event> = await putData(
      endpoints.v1.event_update,
      event
    );
    return eventResult;
  };

  const remove = async (eventId: string): Promise<void> => {
    await deleteData(endpoints.v1.event_remove.replace("{eventId}", eventId));
  };

  return {
    create,
    listUpcomming,
    listPast,
    get,
    update,
    remove,
  };
}
