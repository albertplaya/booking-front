<template>
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
  <div class="flex justify-center" @click.stop="bookingList(event)">
    <div
      class="flex justify-center diagonal-fractions text-3xl text-teal px-2 py-1 rounded-md booking-number"
    >
      {{ event.current_capacity }}/{{ event.capacity }}
    </div>
  </div>
  <div class="text-center">
    <ShareBooking />
  </div>
</template>

<script setup lang="ts">
import { PropType, defineProps } from "vue";
import ShareBooking from "@/components/social/ShareBooking.vue";
import { date } from "quasar";
import { Event } from "@/types/Event";
import router from "@/router";

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
  },
});

const bookingList = (event: Event) => {
  router.push({
    name: "booking-list",
    params: { eventId: event.event_id },
  });
};
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
</style>
