import { Partner } from "@/types/Partner";
import { usePartner } from "@/use/Partner";
import { ulid } from "ulid";
import { getUserLocale } from "get-user-locale";

export interface userAuth {
  email: string;
  photoURL: string | null;
  displayName: string | null;
}

export function useAuth() {
  const { create, getByEmail } = usePartner();

  const registerPartner = async (user: userAuth) => {
    try {
      const partnerAlreadyStored: Partner = await getByEmail(user.email);
      if (partnerAlreadyStored) {
        storePartner(partnerAlreadyStored);
        return;
      }
    } catch (e) {}

    const newPartner: Partner = initializePartner(user);
    await create(newPartner);
    storePartner(newPartner);
  };

  const loginPartner = async (email: string) => {
    try {
      const partner: Partner = await getByEmail(email);
      if (partner) {
        storePartner(partner);
        return;
      }
    } catch (e) {}
  };

  const storePartner = (partner: Partner) => {
    localStorage.setItem("partner", JSON.stringify(partner));
  };

  const removePartner = async (): Promise<void> => {
    localStorage.removeItem("partner");
  };

  const getPartner = (): Partner => {
    return JSON.parse(localStorage.getItem("partner")) as Partner;
  };

  const initializePartner = (user: userAuth): Partner => {
    let givenName = null;
    let familyName = null;
    if (user.displayName) {
      const splitFullName = user.displayName.split(" ");
      givenName = splitFullName.length !== 0 ? splitFullName[0] : null;
      familyName = 1 in splitFullName ? splitFullName[1] : null;
    }

    return {
      partner_id: ulid(),
      email: user.email,
      given_name: givenName,
      family_name: familyName,
      picture: user.photoURL ? user.photoURL : null,
      locale: getUserLocale(),
      subscription_plan: "BETA",
      subdomain:
        givenName && familyName
          ? generateSubdomain(givenName, familyName)
          : null,
    } as Partner;
  };

  const generateSubdomain = (givenName: string, familyName: string): string => {
    const given_name = replaceSpecialChars(givenName);
    const family_name = replaceSpecialChars(familyName);
    return `${given_name}-${family_name}`;
  };

  const replaceSpecialChars = (value: string): string => {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/([^\w]+|\s+)/g, "-") // Replace space and other characters by hyphen
      .replace(/\-\-+/g, "-") // Replaces multiple hyphens by one hyphen
      .replace(/(^-+|-+$)/g, ""); // Remove extra hyphens from beginning or end of the string
  };

  return { registerPartner, loginPartner, getPartner };
}
