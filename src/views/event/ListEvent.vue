<template>
  <q-page padding style="max-width: 880px">
    <div class="flex justify-between">
      <h3 class="text-2xl ml-2">Events</h3>
      <q-separator />
      <q-btn label="Add" type="submit" color="primary" />
    </div>
    <div class="flex row-auto">
      <q-card
        class="my-card m-2"
        flat
        bordered
        v-for="event in events"
        :key="event.event_id"
      >
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs flex justify-between">
            {{ date.formatDate(event.start_date, 'YYYY-MM-DD') }}
            {{ date.formatDate(event.start_date, 'HH:mm') }}
            {{ event.duration }}
            {{ event.current_capacity }}/{{ event.capacity }}
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useEvent } from '@/use/Event';
import { Event } from '@/types/Event';
import { date } from 'quasar';

export default defineComponent({
  components: {},
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
