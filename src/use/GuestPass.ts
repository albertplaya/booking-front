import { GuestPass } from "./../types/GuestPass";
import { Pass } from "@/types/Pass";
import { Guest } from "./../types/Guest";
import { ulid } from "ulid";
import { endpoints } from "@/config/endpoints";
import {
  postData,
  putData,
  getData,
  deleteData,
} from "@/infrastructure/ApiHandler";

export function useGuestPass() {
  const createGuestPass = async (pass: Pass, guest: Guest): Promise<any> => {
    const payload = {
      guest_pass_id: ulid(),
      pass_id: pass.pass_id,
      guest_id: guest.guest_id,
    };

    const guestPassResult: Promise<any> = await postData(
      endpoints.v1.guest_pass_create,
      payload
    );
    return guestPassResult;
  };

  const getGuestPassesByGuest = async (guestId: string): Promise<any> => {
    const guestResult = await getData(
      endpoints.v1.guest_pass_get_by_guest.replace("{guestId}", guestId)
    );
    return guestResult.data as GuestPass[];
  };

  const updateGuestPassStatus = async (guestPass: GuestPass): Promise<void> => {
    await putData(endpoints.v1.guest_pass_update, {
      guest_pass_id: guestPass.guest_pass_id,
      status: guestPass.status,
    });
  };

  return {
    createGuestPass,
    getGuestPassesByGuest,
    updateGuestPassStatus,
  };
}
