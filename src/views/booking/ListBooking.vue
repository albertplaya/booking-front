<template>
  <q-page class="flex justify-center bg-gray-50" padding>
    <div style="width: 895px">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl ml-2">Bookings</h3>
        <div class="flex">
          <label for="filter-booking-modal">
            <q-icon
              class="cursor-pointer mr-2 rounded-full drop-shadow bg-white p-2"
              text-color="black"
              color="lightgrey"
              size="2em"
              name="tune"
            />
          </label>

          <q-btn
            no-caps
            :to="{ name: 'pos-activity-list' }"
            label="Add Booking"
            type="submit"
            color="teal"
            icon="add"
            style="color: typography-primary-inverted"
          />
        </div>
      </div>
      <FilterBookingModal @filterOutput="listBookingsWithFilters" />
      <BookingModal
        v-if="selectedBooking && showModal"
        :showModal="showModal"
        :bookingId="selectedBooking.booking_id"
        @closeModal="closeModalAndRefresh"
      />
      <div v-if="!bookings.length" class="flex">
        <div
          class="flex justify-center flex-grow text-2xl bg-gray-50 border-2 rounded-md mt-4 p-4"
        >
          No bookings yet!
        </div>
      </div>
      <div v-else class="flex flex-col mt-4">
        <div class="grid grid-cols-3 gap-4 center m-1 p-1">
          <div class="text-lg font-bold flex justify-center">Activity</div>
          <div class="text-lg font-bold flex justify-center">Guest</div>
          <div class="text-lg font-bold flex justify-center">Status</div>
        </div>

        <div
          class="mb-2 bg-white rounded-md tems-center border-gray-200 border-2"
          flat
          bordered
        >
          <div v-for="booking in bookings" :key="booking.booking_id">
            <div
              class="booking grid grid-cols-3 gap-4 p-2 bg-white rounded-md items-center"
              @click="showBookingModal(booking)"
            >
              <div class="text-sm text-center">
                {{ booking.title }}
              </div>
              <div class="flex justify-around">
                <div>
                  {{ booking.guest.first_name }}
                  {{ booking.guest.last_name }}
                </div>
                <div class="text-xs sm:text-sm">
                  {{ booking.guest.email }}
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
            <div
              v-if="bookings[bookings.length - 1] !== booking"
              q-space
              class="border"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Booking } from "@/types/Booking";
import { useBooking } from "@/use/Booking";
import { useAuth } from "@/use/Authentication";
import { useTracker } from "@/use/Tracker";
import BookingModal from "@/components/booking/BookingModal.vue";
import FilterBookingModal from "@/components/booking/FilterBookingModal.vue";
import router from "@/router";
import { FilterCriteria } from "@/use/FilterCriteria";
import { Criteria } from "@/types/Criteria";

onMounted(() => {
  const filterCriterias = [
    {
      parameter: "partner",
      value: getPartner().partner_id,
    },
  ];
  filterCriteria.value = new FilterCriteria(filterCriterias);
  listBookings();
  trackScreen("ListBooking");
});

const { getPartner } = useAuth();
const { listBookingsWithFilter } = useBooking();
const { trackScreen } = useTracker();

const bookings = ref<Booking[]>([]);
const showModal = ref<boolean>(false);
const selectedBooking = ref<Booking>();
const filterCriteria = ref<FilterCriteria>(new FilterCriteria([]));

const showBookingModal = (booking: Booking) => {
  selectedBooking.value = booking;
  showModal.value = true;
};

const listBookings = async () => {
  listBookingsWithFilter(filterCriteria.value)
    .then((result) => (bookings.value = result))
    .catch((e) => {
      return router.push({ name: "not-found" });
    });
};

const listBookingsWithFilters = async (filter: FilterCriteria) => {
  const filterCriteriaFromUser: Array<Criteria> = filter.criterias;
  filterCriteriaFromUser.push({
    parameter: "partner",
    value: getPartner().partner_id,
  });
  filterCriteria.value = new FilterCriteria(filterCriteriaFromUser);
  listBookings();
};

const closeModalAndRefresh = () => {
  showModal.value = false;
  listBookings();
};
</script>

<style scoped lang="scss">
.booking {
  cursor: pointer;
}
.booking:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(249, 250, 251, var(--tw-bg-opacity)) !important;
}
</style>
