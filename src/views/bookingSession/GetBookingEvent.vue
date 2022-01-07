<template>
  <q-page
    v-if="eventBooking"
    padding
    class="flex justify-center items-center bg-gray-200"
  >
    <q-card class="booking-card">
      <q-img
        src="https://www.hola.com/imagenes/estar-bien/20210507189097/razones-empezar-practicar-yoga/0-949-159/yoga-m.jpg?filter=w500"
        fit="fill"
      />
      <q-card-section>
        <q-avatar
          cover=""
          size="100px"
          class="absolute"
          style="top: 0; left: 12px; transform: translateY(-80%)"
        >
          <img
            src="https://media1.popsugar-assets.com/files/thumbor/ck63Ryb_5C2w6wGkmwXTODedG6E/0x55:3191x3246/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2019/11/20/847/n/1922398/60f627eb5dd592157d0953.98365826_/i/Zendaya.jpg"
          />
        </q-avatar>

        <div class="flex flex-nowrap justify-between items-baseline">
          <div class="text-h6">
            {{ eventBooking.data.activity.title }}
          </div>
          <div class="text-h8 font-bold text-gray-400">FREE</div>
        </div>
        <div class="flex items-center">
          <q-icon name="place" class="text-grey mr-1" style="font-size: 1rem" />
          <div class="text-subtitle2 text-grey">Online</div>
        </div>
        <div class="q-pt-none flex items-center mt-1">
          <q-icon name="event" class="text-grey mr-1" style="font-size: 1rem" />
          <div class="text-subtitle2 text-grey">
            {{ date.formatDate(eventBooking.data.event.start_date, 'DD MMM') }}
            ・
            {{ date.formatDate(eventBooking.data.event.start_date, 'HH:mm A') }}
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="flex items-center">
        <div class="text-caption text-grey">
          {{ eventBooking.data.activity.description }}
        </div>
      </q-card-section>

      <q-card-actions class="m-2">
        <q-btn
          class="full-width"
          color="primary"
          :to="{
            name: 'booking-guest',
            params: { eventId: eventBooking.data.event.event_id.value }
          }"
          >Book
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useBookingSession } from '@/use/BookingSession';
import { EventBooking } from '@/types/EventBooking';
import { date } from 'quasar';

export default defineComponent({
  components: {},
  props: {
    eventId: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.getEventBookingDetails();
  },
  setup(props) {
    const { getEvent } = useBookingSession();
    const eventBooking = ref<EventBooking>();

    const getEventBookingDetails = async () => {
      eventBooking.value = await getEvent(props.eventId);
    };
    return { date, eventBooking, getEventBookingDetails };
  }
});
</script>

<style scoped>
.booking-card {
  width: 20rem;
  height: auto;
}
</style>
