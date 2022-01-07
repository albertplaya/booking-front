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
            params: { activityId: activityId }
          }"
        />
      </div>
      <AddWhenEmptyList
        v-if="!events.length"
        label="Add new event"
        to="event-add"
      />
      <div v-else class="flex flex-col">
        <div
          class="flex justify-around m-2 bg-white rounded-md p-2 items-center border-gray-200 border-2"
          flat
          bordered
          v-for="event in events"
          :key="event.event_id"
        >
          <div class="flex flex-col items-center">
            <div class="text-xl font-bold text-gray-600">
              {{ date.formatDate(event.start_date, 'DD') }}
            </div>
            <div class="uppercase font-bold">
              {{ date.formatDate(event.start_date, 'MMM') }}
            </div>
          </div>
          <div class="text-lg">
            {{ date.formatDate(event.start_date, 'HH:mm A') }}
          </div>
          <div class="text-lg" style="width: 100px">
            {{ event.duration }} min
          </div>
          <div class="diagonal-fractions text-3xl" style="width: 80px">
            {{ event.current_capacity }}/{{ event.capacity }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useEvent } from '@/use/Event';
import { Event } from '@/types/Event';
import { date } from 'quasar';
import AddWhenEmptyList from '@/components/button/AddWhenEmptyList.vue';

export default defineComponent({
  components: { AddWhenEmptyList },
  props: {
    activityId: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.listEvents();
  },
  setup(props) {
    const { list } = useEvent();
    const events = ref<Event[]>([]);

    const listEvents = async () => {
      events.value = await list(props.activityId);
    };
    return { events, listEvents, date };
  }
});
</script>
