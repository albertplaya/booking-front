import { Activity } from '@/types/Activity';
import { endpoints } from '@/config/endpoints';
import { postData, putData, getData } from '@/infrastructure/ApiHandler';
import { upload } from '@/infrastructure/FileUploader';

export function useActivity() {
  const create = async (activity: Activity): Promise<Activity> => {
    const payload = {
      partner_id: activity.partner_id,
      title: activity.title,
      description: activity.description,
      image_id: activity.image_id
    };

    const activity_res: Promise<Activity> = await postData(
      endpoints.v1.activity_create,
      payload
    );
    return activity_res;
  };

  const update = async (activity: Activity): Promise<Activity> => {
    const payload = {
      activity_id: activity.activity_id.value,
      title: activity.title,
      description: activity.description
    };

    const activity_res: Promise<Activity> = await putData(
      endpoints.v1.activity_update,
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

  const get = async (activityId: string): Promise<Activity> => {
    const getActivity = await getData(
      endpoints.v1.activity_get.replace('{activityId}', activityId)
    );
    return getActivity.data as Activity;
  };

  const uploadImage = async (file: any): Promise<string> => {
    const res = await upload(endpoints.v1.activity_upload_image, file);
    return res.data.activity_image_id as string;
  };

  return {
    create,
    update,
    list,
    get,
    uploadImage
  };
}
