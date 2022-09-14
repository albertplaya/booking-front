import { Partner } from "./../types/Partner";
import { inject } from "vue";

export function useTracker() {
  const mixpanel = inject("mixpanel");

  const trackScreen = async (name: string, params: any = {}): Promise<void> => {
    mixpanel.track(name, { type: "screen", ...params });
  };

  const trackEvent = async (name: string, params: any = {}): Promise<void> => {
    mixpanel.track(name, { type: "event", ...params });
  };

  const trackAction = async (name: string, params: any = {}): Promise<void> => {
    mixpanel.track(name, { type: "action", ...params });
  };

  const trackIdentify = async (user: Partner): Promise<void> => {
    mixpanel.people.set({
      $name: `${user.given_name} ${user.family_name}`,
      $email: user.email,
      $avatar: user.picture,
      ...user,
    });
    mixpanel.identify(user.partner_id);
  };

  return {
    trackScreen,
    trackIdentify,
    trackEvent,
    trackAction,
  };
}
