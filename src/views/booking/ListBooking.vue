<template>
  <q-page class="flex justify-center bg-gray-50" padding>
    <div style="width: 895px">
      <div class="flex justify-between">
        <h3 class="text-2xl ml-2">Bookings</h3>
        <q-separator />
        <BackButton />
      </div>
      <div v-if="!bookings.length" class="flex">
        <div
          class="flex justify-center flex-grow text-2xl bg-gray-50 border-2 rounded-md mt-4 p-4"
        >
          No bookings yet!
        </div>
      </div>
      <div v-else class="flex flex-col mt-4">
        <div class="grid grid-cols-3 gap-4 center m-2 p-2">
          <div class="text-lg font-bold flex justify-center">Booking</div>
          <div class="text-lg font-bold flex justify-center">Guest</div>
          <div class="text-lg font-bold flex justify-center">Status</div>
        </div>
        <div
          class="grid grid-cols-3 gap-4 m-2 bg-white rounded-md p-2 items-center border-gray-200 border-2"
          flat
          bordered
          v-for="booking in bookings"
          :key="booking.booking_id"
        >
          <div class="text-sm">
            {{ booking.booking_id.value }}
          </div>
          <div class="flex">
            <div>
              {{ booking.guest.first_name }}
              {{ booking.guest.last_name }}
            </div>
            <div class="text-sm">
              {{ booking.email }}
            </div>
          </div>
          <div class="text-lg flex justify-center">
            <div
              class="text-teal px-2 py-1 rounded-md"
              style="background: #e8f2ed"
            >
              {{ booking.status }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { date } from 'quasar';
import BackButton from '@/components/button/Back.vue';
import { useBooking } from '@/use/Booking';
import { Booking } from '@/types/Booking';

export default defineComponent({
  components: { BackButton },
  props: {
    eventId: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.listBookings();
  },
  setup(props) {
    const { listByEventId } = useBooking();
    const bookings = ref<Booking[]>([]);

    const listBookings = async () => {
      bookings.value = await listByEventId(props.eventId);
    };
    return { bookings, listBookings, date };
  }
});
</script>
