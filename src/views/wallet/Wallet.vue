<template>
  <q-page class="flex-1 bg-gray-50" padding>
    <div class="flex flex-col">
      <div class="flex justify-between items-center">
        <h3 class="text-2xl ml-2">Wallet</h3>
        <q-separator />
        <div class="flex">
          <download-csv :data="walletResumeLine">
            <q-btn
              class="mr-2"
              round
              text-color="black"
              color="lightgrey"
              icon="download"
              target="_blank"
            />
          </download-csv>
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
      <div class="flex flex-row justify-around">
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
import { WalletResumeLine } from "@/types/WalletResumeLine";
import { FilterCriteria } from "@/use/FilterCriteria";

onMounted(async () => {
  await listBookings();
  await listGuestPass();
  totalBookingRevenue.value = sumTotalBookingRevenue();
  totalPassRevenue.value = sumTotalPassRevenue();
  calculateRevenueByMonth();
  generateWalletResume();
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
const walletResumeLine = ref<WalletResumeLine[]>([]);
const showRevenue = ref<string>("totalRevenueByMonth");

const listBookings = async () => {
  const filterCriterias = [
    {
      parameter: "partner",
      value: getPartner().partner_id,
    },
  ];
  const filterCriteria = new FilterCriteria(filterCriterias);
  await listBookingsWithFilter(filterCriteria)
    .then((result) => (bookings.value = result))
    .catch((e) => {
      return router.push({ name: "not-found" });
    });
};

const listGuestPass = async () => {
  const filterCriterias = [
    {
      parameter: "partner",
      value: getPartner().partner_id,
    },
  ];
  const filterCriteria = new FilterCriteria(filterCriterias);
  await listGuestPassWithFilter(filterCriteria)
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

const generateWalletResume = () => {
  bookings.value.map((booking: Booking) => {
    walletResumeLine.value.push({
      id: booking.booking_id,
      type: "booking",
      title: booking.title,
      status: booking.status,
      month: new Date(booking.start_date).toLocaleString("default", {
        month: "long",
      }),
      price: booking.price / 100,
    });
  });

  guestPass.value.map((guestPass: GuestPass) => {
    walletResumeLine.value.push({
      id: guestPass.guest_pass_id,
      type: "pass",
      title: guestPass.title,
      status: guestPass.status,
      month: guestPass.created_date
        ? new Date(guestPass.created_date).toLocaleString("default", {
            month: "long",
          })
        : "",
      price: guestPass.price / 100,
    });
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
