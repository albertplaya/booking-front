<template>
  <q-page class="flex justify-center bg-gray-50" padding>
    <div style="width: 895px">
      <div class="flex justify-between">
        <h3 class="text-2xl ml-2">Events</h3>
        <q-separator />
        <q-btn
          no-caps
          label="Add Event"
          type="submit"
          color="teal"
          :to="{
            name: 'event-add',
            params: { activityId: activityId },
          }"
        />
      </div>
      <AddWhenEmptyList
        v-if="!events.length"
        label="Add new event"
        to="event-add"
      />
      <div v-else class="flex flex-col">
        <div v-for="event in events" :key="event.event_id">
          <router-link
            :to="{
              name: 'event-update',
              params: { eventId: event.event_id.value },
            }"
          >
            <div
              class="flex justify-around m-2 bg-white rounded-md p-2 items-center border-gray-200 border-2 event"
              flat
              bordered
            >
              <div class="flex flex-col items-center">
                <div class="text-xl font-bold text-gray-600">
                  {{ date.formatDate(event.start_date, "DD") }}
                </div>
                <div class="uppercase font-bold">
                  {{ date.formatDate(event.start_date, "MMM") }}
                </div>
              </div>
              <div class="text-center text-lg">
                {{ date.formatDate(event.start_date, "HH:mm A") }}
              </div>
              <div class="visible-custom">
                <div class="flex justify-center">
                  <q-icon size="2em" name="access_time" />
                  <div class="text-lg pl-1">{{ event.duration }} min</div>
                </div>
              </div>
              <div class="flex justify-center">
                <router-link
                  :to="{
                    name: 'booking-list',
                    params: { eventId: event.event_id.value },
                  }"
                >
                  <div
                    class="flex justify-center diagonal-fractions text-3xl text-teal px-2 py-1 rounded-md booking-number"
                  >
                    {{ event.current_capacity }}/{{ event.capacity }}
                  </div>
                </router-link>
              </div>
              <div class="text-center">
                <ShareBooking />
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useEvent } from "@/use/Event";
import { Event } from "@/types/Event";
import { date } from "quasar";
import AddWhenEmptyList from "@/components/button/AddWhenEmptyList.vue";
import ShareBooking from "@/components/social/ShareBooking.vue";
import router from "@/router";

export default defineComponent({
  components: { AddWhenEmptyList, ShareBooking },
  props: {
    activityId: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.listEvents();
  },
  setup(props) {
    const { list } = useEvent();
    const events = ref<Event[]>([]);

    const listEvents = async () => {
      list(props.activityId)
        .then((result) => (events.value = result))
        .catch(() => {
          return router.push({ name: "not-found" });
        });
    };
    return { events, listEvents, date };
  },
});
</script>

<style scoped lang="scss">
.visible-custom {
  display: none;
}
@media only screen and (min-width: 640px) {
  .visible-custom {
    display: block;
  }
}

.booking-number {
  width: 80px;
  background: $light-teal;
  cursor: pointer;
}
.booking-number:hover {
  color: $dark-teal !important;
}
.event {
  cursor: pointer;
}
.event:hover {
  border-left: 2px solid $teal;
}
</style>
