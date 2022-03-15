<template>
  <div class="flex flex-row">
    <EventHourPill
      v-for="event in events"
      :event="event"
      :selected="current_event == event"
      @click="eventSelected(event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import EventHourPill from "@/components/booking/EventHourPill.vue";
import { date } from "quasar";
import { Event } from "@/types/Event";

export default defineComponent({
  name: "EventHourPillList",
  emits: ["eventChanged"],
  components: {
    EventHourPill,
  },
  props: {
    events: {
      type: Array as PropType<Event[]>,
      required: true,
    },
    current_event: {
      type: Object as PropType<Event>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const eventSelected = (event: Event) => {
      if (event != props.current_event) {
        emit("eventChanged", event);
      }
    };
    return {
      date,
      eventSelected,
    };
  },
});
</script>
