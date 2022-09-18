<template>
  <q-page class="flex-1 bg-white" padding>
    <div class="flex justify-center">
      <div style="max-width: 400px">
        <div class="flex flex-row-reverse">
          <BackButton />
        </div>
        <div v-if="!events.length" class="flex justify-between mb-2">
          <AddWhenEmptyList label="Add new event" to="event-add" />
        </div>
        <div v-else>
          <div class="q-pa-md">
            <div class="q-gutter-md">
              <q-date
                minimal
                v-model="currentDate"
                :events="eventDates"
                :options="disabledDays"
                :flat="true"
                :square="true"
                color="teal"
              />
            </div>
          </div>
          <EventHourPillList
            v-if="currentEvent"
            :events="selectedEvents"
            :current_event="currentEvent"
            @eventChanged="selectNewCurrentEvent"
          />
          <div
            class="grid grid-cols-2 py-4 my-2 rounded-md text-l p-2 bg-grey-2"
          >
            <div class="flex flex-col" v-if="activity">
              <div class="font-bold">
                {{ activity.title }}
              </div>
              <div class="text-grey">
                {{
                  dateUtil.formatDate(currentEvent?.start_date, "DD MMM YYYY")
                }}
              </div>
              <div class="text-grey">
                {{ dateUtil.formatDate(currentEvent?.start_date, "HH:mm A") }} -
                {{
                  dateUtil.formatDate(
                    new Date(currentEvent?.start_date).setTime(
                      new Date(currentEvent?.start_date).getTime() +
                        currentEvent?.duration * 60000
                    ),
                    "HH:mm A"
                  )
                }}
              </div>
            </div>
            <div class="flex flex-col content-end">
              <div class="flex justify-end">Total</div>
              <div v-if="activity.price == 0" class="text-2xl font-bold">
                FREE
              </div>
              <div v-else class="text-2xl font-bold">
                {{ activity?.price / 100 }} {{ activity?.currency }}
              </div>
              <div class="flex justify-end">
                {{ currentEvent?.duration }} minutes
              </div>
            </div>
          </div>

          <q-btn
            v-if="currentEvent"
            class="full-width"
            color="teal"
            :to="{
              name: 'pos-activity-guest',
              params: { eventId: currentEvent.event_id },
            }"
            >Book
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useEvent } from "@/use/Event";
import { useActivity } from "@/use/Activity";
import { Activity } from "@/types/Activity";
import { Event } from "@/types/Event";
import AddWhenEmptyList from "@/components/button/AddWhenEmptyList.vue";
import router from "@/router";
import { date as dateUtil } from "quasar";
import EventHourPillList from "@/components/booking/EventHourPillList.vue";
import BackButton from "@/components/button/Back.vue";
import { useAuth } from "@/use/Authentication";
import { Partner } from "@/types/Partner";

const props = defineProps({
  activityId: {
    type: String,
    default: "",
  },
});

onMounted(async () => {
  listUpcommingEvents();
  getActivity();
});

const { listUpcomming } = useEvent();
const { get } = useActivity();
const activity = ref<Activity>();
const events = ref<Event[]>([]);
const eventDates = ref<string[]>([]);
const currentDate = ref<string>("");
const selectedEvents = ref<Event[]>([]);
const currentEvent = ref<Event>();

const listUpcommingEvents = async () => {
  await listUpcomming(props.activityId)
    .then((result) => (events.value = result))
    .catch(() => {
      return router.push({ name: "not-found" });
    });

  eventDates.value = events.value.map((event) =>
    dateUtil.formatDate(event.start_date, "YYYY/MM/DD")
  );

  currentDate.value = eventDates.value[0];
};

const getActivity = () => {
  get(props.activityId)
    .then((activityResult) => (activity.value = activityResult))
    .catch(() => {
      return router.push({ name: "not-found" });
    });
};

const disabledDays = (date: string) => {
  return eventDates.value.includes(date);
};

const selectNewCurrentEvent = (event: Event) => {
  currentEvent.value = event;
};

watch(
  () => currentDate.value,
  () => {
    selectedEvents.value = events.value.filter(
      (event) =>
        dateUtil.formatDate(event.start_date, "YYYY/MM/DD") ===
        currentDate.value
    );
    currentEvent.value = selectedEvents.value[0];
  }
);
</script>
