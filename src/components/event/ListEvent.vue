<template>
  <div class="flex flex-col">
    <EventBlock
      v-if="eventGroup.today.length > 0"
      :events="eventGroup.today"
      :title="'Today'"
    />
    <EventBlock
      v-if="eventGroup.tomorrow.length > 0"
      :events="eventGroup.tomorrow"
      :title="'Tomorrow'"
    />
    <div v-for="(events, month) in eventGroup.month">
      <EventBlock :events="events" :title="monthsNames[month]" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import EventBlock from "@/components/event/EventBlock.vue";
import { date } from "quasar";
import { Event } from "@/types/Event";

export default defineComponent({
  name: "ListEvents",
  components: { EventBlock },
  props: {
    events: {
      type: Object as PropType<Event[]>,
      default: [],
    },
  },
  setup(props) {
    const isToday = (date: Date) => {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    };

    const isTomorrow = (date: Date) => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return (
        date.getDate() === tomorrow.getDate() &&
        date.getMonth() === tomorrow.getMonth() &&
        date.getFullYear() === tomorrow.getFullYear()
      );
    };

    const eventGroup = {
      today: [] as Event[],
      tomorrow: [] as Event[],
      month: {},
    };
    const eventsByMonth = {};
    props.events.map((event: Event) => {
      const eventDate = new Date(event.start_date);
      if (isToday(eventDate)) {
        eventGroup.today.push(event);
        return;
      }

      if (isTomorrow(eventDate)) {
        eventGroup.tomorrow.push(event);
        return;
      }

      const month = eventDate.getMonth();
      if (!eventsByMonth[month]) {
        eventsByMonth[month] = [];
      }
      eventsByMonth[month].push(event);
    });

    eventGroup.month = eventsByMonth;

    const monthsNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return {
      date,
      eventGroup,
      monthsNames,
    };
  },
});
</script>
