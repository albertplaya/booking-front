import { Partner } from "./../types/Partner";
import { endpoints } from "@/config/endpoints";
import { getData, postData } from "@/infrastructure/ApiHandler";

export function usePartner() {
  const get = async (partnerId: string): Promise<Partner> => {
    const partner = await getData(
      endpoints.v1.partner_get.replace("{partnerId}", partnerId)
    );
    return partner.data as Partner;
  };

  const getByEmail = async (email: string): Promise<Partner> => {
    const partner = await getData(
      endpoints.v1.partner_email.replace("{email}", email)
    );
    return partner.data as Partner;
  };

  const getBySubdomain = async (subdomain: string): Promise<Partner> => {
    const partner = await getData(
      endpoints.v1.partner_subdomain.replace("{subdomain}", subdomain)
    );
    return partner.data as Partner;
  };

  const create = async (partner: Partner): Promise<void> => {
    await postData(endpoints.v1.partner_create, partner);
  };

  return {
    get,
    create,
    getBySubdomain,
    getByEmail,
  };
}
