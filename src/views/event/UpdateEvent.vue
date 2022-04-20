<template>
  <q-page padding class="flex justify-center bg-gray-50">
    <div class="q-pa-md flex-grow" style="max-width: 400px">
      <div class="pb-4 flex row-auto justify-between">
        <h3 class="text-2xl">Update event</h3>
        <BackButton />
      </div>
      <ErrorNotification :error="error" />
      <div
        v-if="event"
        class="q-pa-md pt-4 border border-solid rounded-md border-gray-200"
        style="max-width: 400px"
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
                  <q-date v-model="date" mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
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
                      <q-btn v-close-popup label="Close" color="primary" flat />
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
  </q-page>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue";
import { useEvent } from "@/use/Event";
import BackButton from "@/components/button/Back.vue";
import ErrorNotification from "@/components/notification/Error.vue";
import router from "@/router";
import { Event } from "@/types/Event";

const props = defineProps({
  eventId: {
    type: String,
    default: "",
  },
});

const { get, update, remove } = useEvent();

const date = ref<string>("");
const time = ref<string>("");
const event = ref<Event>();
const error = ref<any>("");

onMounted(() => {
  getEvent(props.eventId);
});

const getEvent = async (eventId: string) => {
  get(eventId)
    .then((result) => {
      event.value = result;
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

  update({
    event_id: props.eventId,
    capacity: event.value.capacity,
    duration: event.value.duration,
    start_date: `${date.value} ${time.value}:00`,
    activity_id: event.value.activity_id,
  } as Event)
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

const deleteEvent = () => {
  if (!event.value) {
    return;
  }
  remove(props.eventId)
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
