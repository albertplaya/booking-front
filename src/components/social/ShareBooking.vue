<template>
  <q-btn no-caps flat color="primary" @click.stop="openModal">
    <q-icon size="2em" name="ios_share" />
  </q-btn>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" :initial-focus="getActiveElement()" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-40"
            leave="duration-200 ease-in"
            leave-from="opacity-40"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 opacity-50 bg-black" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <div class="flex justify-between align-baseline">
                <DialogTitle
                  class="text-xl font-medium leading-6 text-gray-900 pt-2"
                >
                  Add to your calendar:
                </DialogTitle>
                <q-btn no-caps flat color="primary" @click="closeModal">
                  <q-icon size="2em" name="close" />
                </q-btn>
              </div>
              <div v-if="activity" class="mt-4 flex justify-around">
                <a :href="googleCalendar" target="_blank">
                  <q-btn no-caps flat rounded dense style="color: #0088cc">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="186 38 76 76"
                      style="width: 50px"
                    >
                      <path fill="#fff" d="M244 56h-40v40h40V56z" />
                      <path fill="#EA4335" d="M244 114l18-18h-18v18z" />
                      <path fill="#FBBC04" d="M262 56h-18v40h18V56z" />
                      <path fill="#34A853" d="M244 96h-40v18h40V96z" />
                      <path
                        fill="#188038"
                        d="M186 96v12c0 3.315 2.685 6 6 6h12V96h-18z"
                      />
                      <path
                        fill="#1967D2"
                        d="M262 56V44c0-3.315-2.685-6-6-6h-12v18h18z"
                      />
                      <path
                        fill="#4285F4"
                        d="M244 38h-52c-3.315 0 -6 2.685-6 6v52h18V56h40V38z"
                      />
                      <path
                        fill="#4285F4"
                        d="M212.205 87.03c-1.495-1.01-2.53-2.485-3.095-4.435l3.47-1.43c.315 1.2.865 2.13 1.65 2.79.78.66 1.73.985 2.84.985 1.135 0 2.11-.345 2.925-1.035s1.225-1.57 1.225-2.635c0-1.09-.43-1.98-1.29-2.67-.86-.69-1.94-1.035-3.23-1.035h-2.005V74.13h1.8c1.11 0 2.045-.3 2.805-.9.76-.6 1.14-1.42 1.14-2.465 0 -.93-.34-1.67-1.02-2.225-.68-.555-1.54-.835-2.585-.835-1.02 0 -1.83.27-2.43.815a4.784 4.784 0 0 0 -1.31 2.005l-3.435-1.43c.455-1.29 1.29-2.43 2.515-3.415 1.225-.985 2.79-1.48 4.69-1.48 1.405 0 2.67.27 3.79.815 1.12.545 2 1.3 2.635 2.26.635.965.95 2.045.95 3.245 0 1.225-.295 2.26-.885 3.11-.59.85-1.315 1.5-2.175 1.955v.205a6.605 6.605 0 0 1 2.79 2.175c.725.975 1.09 2.14 1.09 3.5 0 1.36-.345 2.575-1.035 3.64s-1.645 1.905-2.855 2.515c-1.215.61-2.58.92-4.095.92-1.755.005-3.375-.5-4.87-1.51zM233.52 69.81l-3.81 2.755-1.905-2.89 6.835-4.93h2.62V88h-3.74V69.81z"
                      />
                    </svg>
                  </q-btn>
                </a>
              </div>
              <div class="divider"></div>
              <div class="flex mt-4 justify-between align-baseline">
                <DialogTitle
                  class="text-xl font-medium leading-6 text-gray-900 pt-2"
                >
                  Share your event:
                </DialogTitle>
              </div>
              <div class="mt-4 flex justify-around">
                <a :href="whatsappLink" target="_blank">
                  <q-btn no-caps flat rounded dense style="color: #25d366">
                    <q-icon size="4em" name="whatsapp" />
                  </q-btn>
                </a>
                <a :href="telegramLink" target="_blank">
                  <q-btn no-caps flat rounded dense style="color: #0088cc">
                    <q-icon size="4em" name="telegram" />
                  </q-btn>
                </a>
                <q-btn
                  no-caps
                  flat
                  rounded
                  dense
                  color="grey"
                  @click="copyLink(props.event)"
                >
                  <q-icon size="4em" name="link" />
                </q-btn>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, PropType, onMounted } from "vue";
import router from "@/router";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";
import { useActivity } from "@/use/Activity";
import { Activity } from "@/types/Activity";
import { Event } from "@/types/Event";
import { GoogleCalendar, CalendarOptions } from "datebook";
import { event } from "quasar";

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
});

onMounted(async () => {
  await mountActivity(props.event.activity_id);
  mountCalendars();
  mountSharedLinks(activity.value, props.event);
});

const activity = ref<Activity>();
const googleCalendar = ref<string>();
const whatsappLink = ref<string>();
const metaLink = ref<string>();
const telegramLink = ref<string>();
const twitterLink = ref<string>();

const isOpen = ref(false);

const closeModal = () => {
  isOpen.value = false;
};
const openModal = () => {
  isOpen.value = true;
};
const getActiveElement = () => {
  return document.activeElement;
};

const { get } = useActivity();

const mountActivity = async (activityId: string) => {
  await get(activityId)
    .then((result: Activity) => {
      activity.value = result;
    })
    .catch(() => {
      return router.push({ name: "not-found" });
    });
};

const mountCalendars = async () => {
  if (!activity.value) return;

  const config: CalendarOptions = {
    title: activity.value.title,
    //location: "The Bar, New York, NY",
    description: activity.value.description,
    start: new Date(props.event.start_date),
    end: addMinutes(props.event.duration, new Date(props.event.start_date)),
  };

  const gCalendar = new GoogleCalendar(config);
  googleCalendar.value = gCalendar.render();
};

function addMinutes(numOfMinutes: any, date = new Date()) {
  date.setMinutes(date.getMinutes() + numOfMinutes);
  return date;
}

const mountSharedLinks = (activity: Activity, event: Event) => {
  const text = "http://localhost:8080/booking/event/";
  const link = "http://localhost:8080/booking/event/";

  whatsappLink.value = `https://api.whatsapp.com/send?text=${text} ${link}`;
  twitterLink.value = `https://twitter.com/intent/tweet?text=${text} ${link}`;
  telegramLink.value = `https://telegram.me/share/?url=${link}&text=${text}`;
};

const copyLink = (event: Event) => {
  const tempInput = document.createElement("input");
  tempInput.value = "http://localhost:8080/booking/event/";
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
};
</script>
