import { Activity } from '@/types/Activity';
import { endpoints } from '@/config/endpoints';
import { postData, getData } from '@/infrastructure/ApiHandler';

export function useActivity() {
  const create = async (activity: Activity): Promise<Activity> => {
    const payload = {
      partner_id: activity.partner_id,
      title: activity.title,
      description: activity.description
    };

    const activity_res: Promise<Activity> = await postData(
      endpoints.v1.activity_create,
      payload
    );
    return activity_res;
  };

  const list = async (partnerId: string): Promise<Activity[]> => {
    const listActivity = await getData(
      endpoints.v1.activity_list.replace('{partnerId}', partnerId)
    );
    return listActivity.data as Activity[];
  };

  return {
    create,
    list
  };
}
