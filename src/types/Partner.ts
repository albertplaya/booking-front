export interface Partner {
  partner_id: string;
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  subscription_plan: string;
  subdomain: string;
  token: string | null;
}
