<template>
  <q-page padding class="flex-1 bg-gray-50">
    <div class="flex justify-center">
      <div style="width: 400px">
        <div class="pb-4 flex row-auto justify-between">
          <h3 class="text-2xl">Update event</h3>
          <BackButton />
        </div>
        <ErrorNotification :error="error" />
        <div
          v-if="event"
          class="q-pa-md pt-4 border border-solid rounded-md border-gray-200"
          style="width: 400px"
        >
          <q-form class="q-gutter-md pt-4">
            <q-input v-model="date" filled>
              <template #prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date" mask="YYYY-MM-DD" color="teal">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="teal" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input v-model="time" filled mask="time" :rules="['time']">
              <template #prepend>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="time"
                      format24h
                      now-btn
                      :minute-options="[0, 15, 30, 45]"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input
              v-model="event.duration"
              filled
              label="Duration in minuts"
              lazy-rules
              autogrow
              :error="formErrors.get('duration') != null"
              :error-message="formErrors.get('duration')?.message"
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-input
              v-model="event.capacity"
              filled
              label="Number of participants"
              lazy-rules
              autogrow
              :error="formErrors.get('capacity') != null"
              :error-message="formErrors.get('capacity')?.message"
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
          </q-form>
        </div>
        <div class="pt-4 q-gutter-sm" style="max-width: 400px">
          <q-btn
            no-caps
            style="color: typography-primary-inverted"
            class="float-right"
            label="Update"
            type="submit"
            color="teal"
            @click="updateEvent"
          />
          <q-btn
            no-caps
            class="float-right"
            label="Delete"
            type="submit"
            color="rhubarb"
            @click="deleteEvent"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useEvent } from "@/use/Event";
import BackButton from "@/components/button/Back.vue";
import ErrorNotification from "@/components/notification/ErrorNotification.vue";
import router from "@/router";
import { Event } from "@/types/Event";
import { ErrorResponse, InputErrorResponse } from "@/types/Form/ErrorResponse";
import { useGoogleCalendar } from "@/use/Calendar/GoogleCalendar";
import { useAuth } from "@/use/Authentication";
import { useActivityStore } from "@/store/ActivityStore";

const props = defineProps({
  eventId: {
    type: String,
    default: "",
  },
});

const { get, update, remove } = useEvent();
const { updateCalendarEvent, removeCalendarEvent } = useGoogleCalendar();
const { getPartner } = useAuth();
const { getActivity } = useActivityStore();

const date = ref<string>("");
const time = ref<string>("");
const timeZone = ref<string>(Intl.DateTimeFormat().resolvedOptions().timeZone);
const event = ref<Event>();
const oldEvent = ref<Event>();
const error = ref<string>("");
const formErrors = ref(new Map<string, InputErrorResponse>());

onMounted(() => {
  getEvent(props.eventId);
});

const getEvent = async (eventId: string) => {
  get(eventId)
    .then((result) => {
      event.value = result;
      oldEvent.value = result;
      const currentDate = new Date(result.start_date);
      date.value = new Intl.DateTimeFormat("fr-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(currentDate);
      time.value = new Intl.DateTimeFormat("default", {
        hour: "numeric",
        minute: "numeric",
      }).format(currentDate);
    })
    .catch(() => {
      return router.push({ name: "not-found" });
    });
};

const updateEvent = () => {
  if (!event.value) {
    return;
  }

  const newEvent: Event = {
    event_id: props.eventId,
    capacity: event.value.capacity,
    duration: event.value.duration,
    start_date: `${date.value} ${time.value}:00`,
    activity_id: event.value.activity_id,
    time_zone: timeZone.value,
  };
  update(newEvent)
    .then(() => {
      const partner = getPartner();
      const activity = getActivity();
      updateCalendarEvent(activity, oldEvent.value, newEvent, partner);

      router.push({
        name: "event-list",
        params: { activityId: event.value.activity_id },
      });
    })
    .catch((errorResult) => {
      if (typeof errorResult === "string") {
        error.value = errorResult;
      } else {
        formErrors.value = errorResult.errors;
      }
    });
};

const deleteEvent = () => {
  if (!event.value) {
    return;
  }
  remove(props.eventId)
    .then(() => {
      const partner = getPartner();
      const activity = getActivity();
      removeCalendarEvent(activity, oldEvent.value, partner);
    })
    .then(() =>
      router.push({
        name: "event-list",
        params: { activityId: event.value.activity_id },
      })
    )
    .catch((err) => {
      error.value = err;
    });
};
</script>

<style lang="scss" scoped>
.bg-rhubarb {
  background: $rhubarb !important;
}
</style>
