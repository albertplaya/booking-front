<template>
  <q-page
    v-if="booking"
    padding
    class="flex justify-center items-center bg-gray-200"
  >
    <div>
      <div class="text-h6 mb-6">Your booking has been confirmed!</div>
      <q-card class="booking-card font-bold">
        <q-card-section class="flex flex-nowrap justify-between">
          <div class="text-h5 font-bold q-mb-xs">{{ booking.data.title }}</div>
          <CloseButton />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="mb-4">
            <div class="text-grey">Booking code</div>
            <div class="text-xs">{{ booking.data.booking_id }}</div>
          </div>
          <div class="grid grid-rows-4 grid-flow-col gap-4">
            <div>
              <div class="text-grey">Date</div>
              <div>
                {{ date.formatDate(booking.data.start_date, "DD MMM") }}
              </div>
            </div>
            <div>
              <div class="text-grey">Cost</div>
              <div>Free</div>
            </div>
            <div>
              <div class="text-grey">Name</div>
              <div>{{ booking.data.guest.first_name }}</div>
            </div>
            <div></div>
            <div>
              <div class="text-grey">Time</div>
              <div>
                {{ date.formatDate(booking.data.start_date, "HH:mm A") }}
              </div>
            </div>
            <div>
              <div class="text-grey">Place</div>
              <div>Online</div>
            </div>

            <div>
              <div class="text-grey">Last name</div>
              <div>{{ booking.data.guest.last_name }}</div>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="m-2 pb-4">
          <a :href="generateUrl(booking.data)" target="_blank">
            <q-btn
              icon="insert_invitation"
              color="teal"
              label="Add to
          calendar"
              target="_blank"
            >
            </q-btn>
          </a>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import { useBookingSession } from "@/use/BookingSession";
import { useBooking } from "@/use/Booking";
import CloseButton from "@/components/button/Close.vue";
import { Booking } from "@/types/Booking";
import { date } from "quasar";

const props = defineProps({
  eventId: {
    type: String,
    default: "",
  },
});
onMounted(async () => {
  finishBookingSession(props.eventId).then((bookingId: string) => {
    setTimeout(getBookingDetails, 1000, bookingId);
  });
});

const { finishBookingSession } = useBookingSession();
const { getBooking } = useBooking();

const booking = ref<Booking>();

const getBookingDetails = async (bookingId: string) => {
  booking.value = await getBooking(bookingId);
};

const generateUrl = (booking: Booking) => {
  return (
    "https://calendar.google.com/calendar/r/eventedit?text=" +
    booking.title +
    "&dates=" +
    date.formatDate(booking.start_date, "YYYYMMDD") +
    date.formatDate(booking.start_date, "Thhmmss") +
    "/" +
    date.formatDate(booking.start_date, "YYYYMMDD") +
    date.formatDate(
      new Date(
        new Date(booking.start_date).getTime() + booking.duration * 60000
      ),
      "Thhmmss"
    )
  );
};
</script>

<style scoped>
.booking-card {
  width: 20rem;
  height: auto;
  border-radius: 1rem;
}
</style>
