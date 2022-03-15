<template>
  <div
    v-if="selected"
    class="pillselected flex hour-pill rounded-md text-l font-bold text-gray-600 justify-center border-gray-200 border-2 p-2 mr-2 cursor-pointer"
  >
    {{ date.formatDate(event.start_date, "HH:mm") }}
  </div>
  <div
    v-else
    class="flex hour-pill rounded-md text-l font-bold text-gray-600 justify-center border-gray-200 border-2 p-2 mr-2 bg-white cursor-pointer"
  >
    {{ date.formatDate(event.start_date, "HH:mm") }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { date } from "quasar";
import { Event } from "@/types/Event";

export default defineComponent({
  name: "EventHourPill",
  props: {
    event: {
      type: Object as PropType<Event>,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      date,
    };
  },
});
</script>

<style scoped lang="scss">
.hour-pill {
  width: 60px;
}

.hour-pill.pillselected {
  background-color: $light-teal;
}
</style>
