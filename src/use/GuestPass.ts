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

  return {
    createGuestPass,
  };
}
