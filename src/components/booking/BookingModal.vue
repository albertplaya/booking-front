<template>
  <input type="checkbox" id="booking-modal" class="modal-toggle" />
  <label for="booking-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
      <div class="flex justify-between">
        <h3 class="text-2xl ml-2">{{ booking.title }}</h3>
        <q-separator />
        <label for="booking-modal"
          ><q-icon class="cursor-pointer" size="2em" name="close"
        /></label>
      </div>
      <div class="bg-whitept-5">
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <div class="mt-2">
            <q-form>
              <q-input
                filled
                v-model="booking.booking_id"
                label="Id"
                lazy-rules
                disable
                readonly
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
              <q-input
                filled
                v-model="booking.title"
                label="Activity"
                lazy-rules
                disable
                readonly
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
              <q-select
                class="mb-4"
                filled
                v-model="booking.status"
                :options="bookingStatus"
                label="Status"
              />
              <q-input
                filled
                v-model="booking.duration"
                label="Duration"
                lazy-rules
                disable
                readonly
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
              <q-input
                filled
                v-model="booking.price"
                label="Price"
                lazy-rules
                disable
                readonly
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
              <q-input
                filled
                v-model="booking.type"
                label="Type"
                lazy-rules
                disable
                readonly
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
              <q-input
                filled
                v-model="booking.source"
                label="Source"
                lazy-rules
                disable
                readonly
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </q-form>
          </div>
          <div class="flex flex-row-reverse">
            <div class="modal-action mt-0">
              <label>
                <q-btn
                  no-caps
                  style="color: typography-primary-inverted"
                  class="float-right"
                  label="Save"
                  type="submit"
                  color="teal"
                  @click="updateBookingAndCloseModal"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </label>
  </label>
</template>

<script setup lang="ts">
import { ref, PropType } from "vue";
import { useBooking } from "@/use/Booking";
import { Booking } from "@/types/Booking";
import router from "@/router";

const props = defineProps({
  booking: {
    type: Object as PropType<Booking>,
    required: true,
  },
});

const { updateBookingStatus } = useBooking();

const bookingStatus = ["booked", "paid"];

const updateBookingAndCloseModal = async () => {
  if (!props.booking) {
    return;
  }
  updateBookingStatus(props.booking)
    .then(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      closeModal();
    })
    .catch((e) => {
      return router.push({ name: "not-found" });
    });
};

const closeModal = async () => {
  document.getElementById("booking-modal").checked = false;
};
</script>
