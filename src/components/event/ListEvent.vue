<template>
  <div class="flex flex-col">
    <EventBlock
      v-if="todayEvents.length > 0"
      :events="todayEvents"
      :title="'Today'"
    />
    <EventBlock
      v-if="tomorrowEvents.length > 0"
      :events="tomorrowEvents"
      :title="'Tomorrow'"
    />

    <div v-for="eventGroup in eventGroups">
      <div v-if="eventGroup.showYear">
        <div class="text-2xl font-bold mt-4 mb-2">
          {{ eventGroup.year }}
        </div>
      </div>
      <EventBlock
        :events="eventGroup.events"
        :title="monthsNames[eventGroup.month]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, onMounted } from "vue";
import EventBlock from "@/components/event/EventBlock.vue";
import { date } from "quasar";
import { Event } from "@/types/Event";

interface EventGroup {
  showYear: boolean;
  year: number;
  month: number;
  events: Event[];
}

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
    onMounted(() => {
      buildEventList();
    });

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

    const todayEvents = ref<Event[]>([]);
    const tomorrowEvents = ref<Event[]>([]);
    const eventGroups = ref<EventGroup[]>([]);

    const buildEventList = () => {
      let showYear = false;
      let year = 0;
      let month = 0;
      let yearMonthEvents: Event[] = [];
      props.events.map((event: Event, index, array) => {
        let eventDate = new Date(event.start_date);
        if (isToday(eventDate)) {
          todayEvents.value.push(event);
          return;
        }

        if (isTomorrow(eventDate)) {
          tomorrowEvents.value.push(event);
          return;
        }

        if (year === 0) {
          showYear = eventDate.getFullYear() !== new Date().getFullYear();
          year = eventDate.getFullYear();
          month = eventDate.getMonth();
          yearMonthEvents = [event];
        } else if (
          year == eventDate.getFullYear() &&
          month == eventDate.getMonth()
        ) {
          yearMonthEvents.push(event);
        } else {
          eventGroups.value.push({
            showYear,
            year: year,
            month: month,
            events: yearMonthEvents,
          });

          showYear = eventDate.getFullYear() !== year;
          year = eventDate.getFullYear();
          month = eventDate.getMonth();
          yearMonthEvents = [event];
        }

        if (index === array.length - 1) {
          eventGroups.value.push({
            showYear,
            year,
            month,
            events: yearMonthEvents,
          });
        }
      });
    };

    watch(
      () => props.events,
      () => {
        todayEvents.value = [];
        tomorrowEvents.value = [];
        eventGroups.value = [];
        buildEventList();
      }
    );

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
      todayEvents,
      tomorrowEvents,
      eventGroups,
      monthsNames,
      buildEventList,
    };
  },
});
</script>
