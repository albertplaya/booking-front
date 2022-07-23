<template>
  <q-page padding class="flex justify-center bg-gray-50">
    <div class="q-pa-md flex-grow" style="max-width: 400px">
      <div class="pb-4 flex row-auto justify-between">
        <h3 class="text-2xl">Add event</h3>
        <BackButton />
      </div>
      <ErrorNotification :error="error" />
      <div
        class="q-pa-md pt-4 border border-solid rounded-md border-gray-200"
        style="max-width: 400px"
      >
        <q-form class="q-gutter-md pt-4">
          <q-input v-model="date" filled>
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="date"
                    first-day-of-week="1"
                    cover
                    today-btn
                    mask="YYYY-MM-DD"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input v-model="time" filled mask="time" :rules="['time']">
            <template v-slot:prepend>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  ref="qTimeProxy"
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
            v-model="duration"
            filled
            label="Duration in minuts"
            lazy-rules
            autogrow
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            v-model="capacity"
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
      <div class="pt-4" style="max-width: 400px">
        <q-btn
          no-caps
          style="color: typography-primary-inverted"
          class="float-right"
          label="Save"
          type="submit"
          color="teal"
          @click="saveEvent"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEvent } from "@/use/Event";
import BackButton from "@/components/button/Back.vue";
import ErrorNotification from "@/components/notification/Error.vue";
import router from "@/router";
import { date as dateHelper } from "quasar";
import { Datetime } from "vue-datetime";

const props = defineProps({
  activityId: {
    type: String,
    default: "",
  },
});
const { create } = useEvent();

const date = ref<string>(dateHelper.formatDate(new Date(), "YYYY-MM-DD"));
const time = ref<string>("12:00");
const duration = ref<string>("30");
const capacity = ref<string>("10");
const error = ref<any>("");

const saveEvent = () => {
  create({
    start_date: date.value + " " + time.value,
    duration: duration.value,
    capacity: capacity.value,
    activity_id: props.activityId,
  })
    .then(() =>
      router.push({
        name: "event-list",
        params: { activityId: props.activityId },
      })
    )
    .catch((err) => {
      error.value = err;
    });
};
</script>
