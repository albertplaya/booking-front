<template>
  <div class="flex flex-col">
    <div class="text-lg font-bold">{{ title }}</div>
    <div
      v-for="(event, key) in events"
      :key="event.event_id"
      @click="updateEvent(event)"
    >
      <div
        v-if="events.length == 1"
        class="flex justify-around m-2 bg-white rounded-md p-2 items-center border-gray-200 border-2 event"
        flat
        bordered
      >
        <EventPill :event="event" />
      </div>
      <div
        v-if="events.length > 1 && key == 0"
        class="flex justify-around m-2 mb-0 bg-white rounded-t-md p-2 items-center border-gray-200 border-t-2 border-r-2 border-l-2 event"
        flat
        bordered
      >
        <EventPill :event="event" />
      </div>
      <div
        v-if="events.length > 1 && key == events.length - 1"
        class="flex justify-around m-2 mt-0 bg-white rounded-b-md p-2 items-center border-gray-200 border-t border-b-2 border-r-2 border-l-2 event"
        flat
        bordered
      >
        <EventPill :event="event" />
      </div>
      <div
        v-if="events.length > 1 && key < events.length - 1 && key > 0"
        class="flex justify-around m-2 mt-0 mb-0 bg-white p-2 items-center border-gray-200 border-r-2 border-l-2 border-t event"
        flat
        bordered
      >
        <EventPill :event="event" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import EventPill from "@/components/event/EventPill.vue";
import { Event } from "@/types/Event";
import router from "@/router";

export default defineComponent({
  name: "EventBlock",
  components: { EventPill },
  props: {
    title: String,
    events: {
      type: Object as PropType<Event[]>,
      default: [],
    },
  },

  setup() {
    const updateEvent = (event: Event) => {
      router.push({
        name: "event-update",
        params: { eventId: event.event_id.value },
      });
    };
    return { updateEvent };
  },
});
</script>

<style scoped lang="scss">
.event {
  cursor: pointer;
}
.event:hover {
  border-left: 2px solid $teal;
}
</style>
