import { Activity } from "./../types/Activity";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useActivityStore = defineStore(
  "activities",
  () => {
    const currentActivity = ref<Activity | null>();

    function setActivity(activity: Activity) {
      currentActivity.value = activity;
    }

    function getActivity() {
      return currentActivity.value;
    }

    return { currentActivity, setActivity, getActivity };
  },
  {
    persist: true,
  }
);
