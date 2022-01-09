import { Event } from '@/types/Event';
import { endpoints } from '@/config/endpoints';
import { postData, getData } from '@/infrastructure/ApiHandler';

export function useEvent() {
  const create = (event: Event): Promise<Event> => {
    const payload = {
      start_date: event.start_date,
      duration: event.duration,
      capacity: event.capacity,
      activity_id: event.activity_id
    };

    const activity_res: Promise<Event> = postData(
      endpoints.v1.event_create,
      payload
    );
    return activity_res;
  };

  const list = async (activityId: string): Promise<Event[]> => {
    const events = await getData(
      endpoints.v1.event_list.replace('{activityId}', activityId)
    );
    return events.data as Event[];
  };

  return {
    create,
    list
  };
}
