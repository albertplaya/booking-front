export interface Activity {
  activity_id: string;
  partner_id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  image_id: string | null;
}
