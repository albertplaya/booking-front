import { ref } from 'vue';
import { Event } from '@/types/Event';
import { endpoints } from '@/config/endpoints';

export function useEvent() {
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
