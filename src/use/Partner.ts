import { Partner } from "./../types/Partner";
import { endpoints } from "@/config/endpoints";
import { getData } from "@/infrastructure/ApiHandler";

export function usePartner() {
  const get = async (partnerId: string): Promise<Partner> => {
    const partner = await getData(
      endpoints.v1.partner_get.replace("{partnerId}", partnerId)
    );
    return partner.data as Partner;
  };

  const getBySubdomain = async (subdomain: string): Promise<Partner> => {
    const partner = await getData(
      endpoints.v1.partner_subdomain.replace("{subdomain}", subdomain)
    );
    return partner.data as Partner;
  };

  return {
    get,
    getBySubdomain,
  };
}
