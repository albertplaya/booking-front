import { ulid } from "ulid";
import { Pass } from "@/types/Pass";
import { endpoints } from "@/config/endpoints";
import {
  postData,
  putData,
  getData,
  deleteData,
} from "@/infrastructure/ApiHandler";

export function usePass() {
  const create = async (pass: Pass): Promise<any> => {
    const payload = {
      pass_id: ulid(),
      partner_id: pass.partner_id,
      title: pass.title,
      description: pass.description,
      quantity: pass.quantity,
      price: pass.price * 100,
      currency: pass.currency,
    };

    const activity_res: Promise<any> = await postData(
      endpoints.v1.pass_create,
      payload
    );
    return activity_res;
  };

  const list = async (partnerId: string): Promise<Pass[]> => {
    const listPass = await getData(
      endpoints.v1.pass_list.replace("{partnerId}", partnerId)
    );
    return listPass.data as Pass[];
  };

  const get = async (passId: string): Promise<Pass> => {
    const getPass = await getData(
      endpoints.v1.pass_get.replace("{passId}", passId)
    );
    return getPass.data as Pass;
  };

  const update = async (pass: Pass): Promise<any> => {
    const payload = {
      pass_id: pass.pass_id,
      partner_id: pass.partner_id,
      title: pass.title,
      description: pass.description,
      quantity: pass.quantity,
      price: pass.price * 100,
      currency: pass.currency,
    };

    const passResult: Promise<any> = await putData(
      endpoints.v1.pass_update,
      payload
    );
    return passResult;
  };

  const remove = async (passId: string): Promise<void> => {
    await deleteData(endpoints.v1.pass_remove.replace("{passId}", passId));
  };

  return {
    create,
    update,
    list,
    get,
    remove,
  };
}
