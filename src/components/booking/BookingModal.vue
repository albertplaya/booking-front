<template>
  <TransitionRoot as="template" :show="showModal">
    <Dialog as="div" class="relative">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed z-50 inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed z-50 inset-0 overflow-y-auto">
        <div
          class="flex items-center justify-center min-h-full p-4 text-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-full md:w-1/4"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div
                  v-if="booking"
                  class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                >
                  <div class="flex justify-between items-center mb-6">
                    <DialogTitle
                      as="h3"
                      class="text-lg leading-6 font-medium text-gray-900"
                    >
                      {{ booking.title }}
                    </DialogTitle>
                    <q-icon size="2em" name="close" @click="closeModal" />
                  </div>

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
                          (val) =>
                            (val && val.length > 0) || 'Please type something',
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
                          (val) =>
                            (val && val.length > 0) || 'Please type something',
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
                          (val) =>
                            (val && val.length > 0) || 'Please type something',
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
                          (val) =>
                            (val && val.length > 0) || 'Please type something',
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
                          (val) =>
                            (val && val.length > 0) || 'Please type something',
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
                          (val) =>
                            (val && val.length > 0) || 'Please type something',
                        ]"
                      />
                    </q-form>
                  </div>
                </div>
              </div>
              <div class="p-4 flex flex-row-reverse">
                <q-btn
                  @click="updateBookingAndCloseModal"
                  no-caps
                  style="color: typography-primary-inverted"
                  class="float-right"
                  label="Save"
                  type="submit"
                  color="teal"
                />
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useBooking } from "@/use/Booking";
import { Booking } from "@/types/Booking";
import router from "@/router";

import {
  Dialog,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  bookingId: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  mountBooking();
});

const { getBooking, updateBookingStatus } = useBooking();

const booking = ref<Booking>();
const bookingStatus = ["booked", "paid"];

const emit = defineEmits(["closeModal"]);
const closeModal = () => {
  emit("closeModal");
};

const mountBooking = async () => {
  getBooking(props.bookingId)
    .then((result: Booking) => (booking.value = result))
    .catch((e) => {
      return router.push({ name: "not-found" });
    });
};

const updateBookingAndCloseModal = async () => {
  if (!booking.value) {
    return;
  }
  updateBookingStatus(booking.value)
    .then(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      closeModal();
    })
    .catch((e) => {
      return router.push({ name: "not-found" });
    });
};
</script>
