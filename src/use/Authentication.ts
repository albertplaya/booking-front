import { Partner } from "@/types/Partner";
import { useStore } from "vuex";
import { inject, watch } from "vue";
import { usePartner } from "@/use/Partner";
import { ulid } from "ulid";

export function useAuth() {
  const auth: any = inject("auth");

  //const store = useStore();

  const storePartner = (partner: Partner) => {
    //store.commit("auth/set", partner);
    localStorage.setItem("partner", JSON.stringify(partner));
  };

  const removePartner = async (): Promise<void> => {
    //store.commit("auth/remove");
    localStorage.removeItem("partner");
  };

  const getPartner = (): Partner => {
    return JSON.parse(localStorage.getItem("partner")) as Partner;
    //return store.getters["auth/user"] as Partner;
  };

  const authPartner = () => {
    const { create, getByEmail } = usePartner();

    watch(
      () => auth.user,
      async () => {
        if (auth.user) {
          const partner: Partner = await getByEmail(auth.user.email);
          if (partner) {
            storePartner(partner);
          } else {
            const partner: Partner = initializePartner(auth.user);
            create(partner);
            storePartner(partner);
          }
        } else {
          removePartner();
        }
      }
    );
  };

  const initializePartner = (user: any): Partner => {
    return {
      partner_id: ulid(),
      email: user.email,
      given_name: user.given_name,
      family_name: user.family_name,
      picture: user.picture,
      locale: user.locale,
      subscription_plan: "BETA",
      subdomain: generateSubdomain(user.given_name, user.family_name),
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

  return { authPartner, getPartner };
}
