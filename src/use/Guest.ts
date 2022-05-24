import { ulid } from "ulid";
import { Guest } from "./../types/Guest";
import { endpoints } from "@/config/endpoints";
import { getData, postData } from "@/infrastructure/ApiHandler";

export function useGuest() {
  const list = async (partnerId: string): Promise<Guest[]> => {
    const result = await getData(
      endpoints.v1.guest_list.replace("{partnerId}", partnerId)
    );
    return result.data as Guest[];
  };

  const create = async (guest: Guest): Promise<void> => {
    const payload = {
      guest_id: ulid(),
      partner_id: guest.partner_id,
      first_name: guest.first_name,
      last_name: guest.last_name,
      email: guest.email,
      phone: guest.phone,
    };
    await postData(endpoints.v1.guest_create, payload);
  };

  return {
    list,
    create,
  };
}
