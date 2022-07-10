import { ulid } from "ulid";
import { Guest } from "./../types/Guest";
import { endpoints } from "@/config/endpoints";
import { getData, postData } from "@/infrastructure/ApiHandler";

export function useGuest() {
  const listGuest = async (partnerId: string): Promise<Guest[]> => {
    const result = await getData(
      endpoints.v1.guest_list.replace("{partnerId}", partnerId)
    );
    return result.data as Guest[];
  };

  const createGuest = async (guest: Guest): Promise<void> => {
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

  const getGuest = async (guestId: string): Promise<Guest> => {
    const guestResult = await getData(
      endpoints.v1.guest_get.replace("{guestId}", guestId)
    );
    return guestResult.data as Guest;
  };

  return {
    listGuest,
    createGuest,
    getGuest,
  };
}
