import { endpoints } from "./../config/endpoints";
import { postData } from "@/infrastructure/ApiHandler";
import { User } from "@/types/User";
import { useStore } from "vuex";
import { inject, watch } from "vue";

export function useAuth() {
  const auth: any = inject("auth");

  const store = useStore();

  const initializePartner = (user: User) => {
    store.commit("auth/set", {
      given_name: auth.user.given_name,
      family_name: auth.user.family_name,
      picture: auth.user.picture,
      locale: auth.user.locale,
      email: auth.user.email,
    } as User);
  };

  const removePartner = () => {
    store.commit("auth/remove");
  };

  const getUser = (): User => {
    return store.getters["auth/user"] as User;
  };

  const authUser = () => {
    watch(
      () => auth.user,
      () => {
        if (auth.user) {
          initializePartner(auth.user);
          const user: User = getUser();
          console.log(user);
          createPartner(user);
        } else {
          removePartner();
        }
      }
    );
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

  const generateSubdomain = (user: User): string => {
    const given_name = replaceSpecialChars(user.given_name);
    const family_name = replaceSpecialChars(user.family_name);
    return `${given_name}-${family_name}`;
  };

  const createPartner = async (user: User): Promise<void> => {
    const payload = {
      email: user.email,
      given_name: user.given_name,
      family_name: user.family_name,
      picture: user.picture,
      locale: user.locale,
      subscription_plan: "BETA",
      subdomain: generateSubdomain(user),
    };

    await postData(endpoints.v1.partner_create, payload);
  };

  return { authUser, getUser };
}
