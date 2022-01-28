import { Uuid } from './Uuid';
export interface Activity {
  activity_id: Uuid;
  partner_id: string;
  title: string;
  description: string;
  image_id: string | null;
}
