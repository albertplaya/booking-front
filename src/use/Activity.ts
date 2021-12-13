import { ref } from 'vue';
import { Activity } from '@/types/Activity';
import { endpoints } from '@/config/endpoints';

const activity = ref<Activity>();
const userActivities = ref<Array<Activity>>([]);
const activities = ref<Array<Array<Activity>>>([]);

export function useActivity() {
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
    console.log(response);
    return response.json();
  }

  const create = (activity: Activity): Promise<Activity> => {
    const payload = {
      partner_id: activity.partner_id,
      title: activity.title,
      description: activity.description
    };

    const activity_res: Promise<Activity> = postData(
      endpoints.v1.activity_create,
      payload
    );
    return activity_res;
  };

  return {
    create
  };
}
