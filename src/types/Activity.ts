import { Ulid } from "./Ulid";
export interface Activity {
  activity_id: Ulid;
  partner_id: string;
  title: string;
  description: string;
  image_id: Ulid | null;
}
