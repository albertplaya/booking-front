import { Activity } from '@/types/Activity';
import { endpoints } from '@/config/endpoints';

export function useActivity() {
  async function postData(url: string = '', data = {}) {
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
  async function getData(url: string = ''): Promise<any> {
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

  const list = async (partnerId: string): Promise<Activity[]> => {
    const test = await getData(
      endpoints.v1.activity_list.replace('{partnerId}', partnerId)
    );
    return test.data as Activity[];
  };

  return {
    create,
    list
  };
}
