<template>
  <q-page class="flex justify-center bg-gray-50" padding>
    <div style="width: 895px">
      <div class="flex justify-between">
        <h3 class="text-2xl ml-2">Wallet</h3>
        <q-separator />
        <q-btn
          color="teal"
          no-caps
          type="submit"
          :to="{
            name: 'pass-list',
          }"
        >
          <q-icon left size="2em" name="local_activity" />
          <div>Passes</div>
        </q-btn>
      </div>
      <div
        class="wallet-total-revenue"
        @click="showRevenue = 'totalRevenueByMonth'"
      >
        <div class="text-lg font-bold mb-2">Total revenue</div>
        <div class="flex flex-row items-baseline justify-center">
          <div class="text-4xl font-bold">
            {{ (totalBookingRevenue + totalPassRevenue) / 100 }}
          </div>
          <div class="text-lg font-semibold pl-2">EUR</div>
        </div>
      </div>
      <div class="flex flex-row justify-center justify-around">
        <div
          class="wallet-booking-revenue"
          @click="showRevenue = 'totalBookingRevenueByMonth'"
        >
          <div class="text-md font-bold mb-2">Booking revenue</div>
          <div class="flex flex-row items-baseline justify-center">
            <div class="text-2xl font-bold">
              {{ totalBookingRevenue / 100 }}
            </div>
            <div class="text-lg font-semibold pl-2">EUR</div>
          </div>
        </div>
        <div
          class="wallet-pass-revenue"
          @click="showRevenue = 'totalPassRevenueByMonth'"
        >
          <div class="text-md font-bold mb-2">Pass revenue</div>
          <div class="flex flex-row items-baseline justify-center">
            <div class="text-2xl font-bold">{{ totalPassRevenue / 100 }}</div>
            <div class="text-lg font-semibold pl-2">EUR</div>
          </div>
        </div>
      </div>
      <div class="pt-4">
        <div class="font-bold p-2">Total revenue:</div>
        <q-separator />
        <div
          v-if="showRevenue == 'totalRevenueByMonth'"
          v-for="revenue in totalRevenueByMonth"
          class="wallet-revenue-by-month flex justify-between p-2"
        >
          <div class="font-medium">
            {{ date.formatDate(new Date(revenue.year, revenue.month), "MMMM") }}
          </div>
          <div class="">{{ revenue.revenue / 100 }} EUR</div>
        </div>
        <div
          v-if="showRevenue == 'totalBookingRevenueByMonth'"
          v-for="revenue in totalBookingRevenueByMonth"
          class="wallet-revenue-by-month flex justify-between p-2"
        >
          <div class="font-medium">
            {{ date.formatDate(new Date(revenue.year, revenue.month), "MMMM") }}
          </div>
          <div class="">{{ revenue.revenue / 100 }} EUR</div>
        </div>
        <div
          v-if="showRevenue == 'totalPassRevenueByMonth'"
          v-for="revenue in totalPassRevenueByMonth"
          class="wallet-revenue-by-month flex justify-between p-2"
        >
          <div class="font-medium">
            {{ date.formatDate(new Date(revenue.year, revenue.month), "MMMM") }}
          </div>
          <div class="">{{ revenue.revenue / 100 }} EUR</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Partner } from "@/types/Partner";
import { useAuth } from "@/use/Authentication";
import router from "@/router";
import { useBooking } from "@/use/Booking";
import { Booking } from "@/types/Booking";
import { date } from "quasar";
import { useGuestPass } from "@/use/GuestPass";
import { GuestPass } from "@/types/GuestPass";

onMounted(async () => {
  await listBookings();
  await listGuestPass();
  totalBookingRevenue.value = sumTotalBookingRevenue();
  totalPassRevenue.value = sumTotalPassRevenue();
  calculateRevenueByMonth();
});

const { getPartner } = useAuth();
const { listBookingsWithFilter } = useBooking();
const { listGuestPassWithFilter } = useGuestPass();

const partner = ref<Partner>();
const bookings = ref<Booking[]>([]);
const guestPass = ref<GuestPass[]>([]);
const totalBookingRevenue = ref<number>(0);
const totalPassRevenue = ref<number>(0);
const totalRevenueByMonth = ref<{ [key: string]: any }>({});
const totalBookingRevenueByMonth = ref<{ [key: string]: any }>({});
const totalPassRevenueByMonth = ref<{ [key: string]: any }>({});
const showRevenue = ref<string>("totalRevenueByMonth");

const listBookings = async () => {
  partner.value = getPartner();
  await listBookingsWithFilter({
    partner: partner.value.partner_id,
  })
    .then((result) => (bookings.value = result))
    .catch((e) => {
      return router.push({ name: "not-found" });
    });
};

const listGuestPass = async () => {
  partner.value = getPartner();
  await listGuestPassWithFilter({
    partner: partner.value.partner_id,
  })
    .then((result) => (guestPass.value = result))
    .catch((e) => {
      return router.push({ name: "not-found" });
    });
};

const sumTotalBookingRevenue = (): number => {
  return bookings.value.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);
};

const sumTotalPassRevenue = (): number => {
  return guestPass.value.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);
};

const calculateRevenueByMonth = (): void => {
  bookings.value.map((curr) => {
    const date = new Date(curr.start_date);
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${month}-${year}`;
    if (!totalBookingRevenueByMonth.value[key]) {
      totalBookingRevenueByMonth.value[key] = {
        month: month,
        year: year,
        revenue: 0,
      };
      totalRevenueByMonth.value[key] = {
        month: month,
        year: year,
        revenue: 0,
      };
    }
    totalBookingRevenueByMonth.value[key].revenue += curr.price;
    totalRevenueByMonth.value[key].revenue += curr.price;
  });

  guestPass.value.map((curr) => {
    const date = new Date(curr.created_date);
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${month}-${year}`;
    if (!totalPassRevenueByMonth.value[key]) {
      totalPassRevenueByMonth.value[key] = {
        month: month,
        year: year,
        revenue: 0,
      };
    }
    if (!totalRevenueByMonth.value[key]) {
      totalRevenueByMonth.value[key] = {
        month: month,
        year: year,
        revenue: 0,
      };
    }
    totalPassRevenueByMonth.value[key].revenue += curr.price;
    totalRevenueByMonth.value[key].revenue += curr.price;
  });
};
</script>

<style scoped lang="scss">
.wallet-total-revenue {
  @apply p-8 m-2 rounded-lg text-center mt-4 cursor-pointer;
  background-color: $light-petrol;
  &:hover {
    color: white;
    background-color: $petrol;
  }
}
.wallet-booking-revenue {
  @apply p-6 rounded-lg text-center mt-1 cursor-pointer;
  background-color: $light-rhubarb;
  &:hover {
    color: white;
    background-color: $rhubarb;
  }
}
.wallet-pass-revenue {
  @apply p-6 rounded-lg text-center mt-1 cursor-pointer;
  background-color: $light-wheat;
  &:hover {
    color: white;
    background-color: $wheat;
  }
}
</style>
