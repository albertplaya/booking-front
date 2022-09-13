<template>
  <input type="checkbox" id="filter-booking-modal" class="modal-toggle" />
  <label for="filter-booking-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
      <div class="flex justify-between">
        <h3 class="text-2xl">Filter</h3>
        <q-separator />
        <label for="filter-booking-modal"
          ><q-icon class="cursor-pointer" size="2em" name="close"
        /></label>
      </div>
      <div class="flex flex-col">
        <h3 class="text-lg my-2">Date Range</h3>
        <div class="grid grid-cols-2 gap-2">
          <q-select
            filled
            :options="monthList"
            v-model="month"
            label="Month"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-select
            filled
            :options="yearList"
            v-model="year"
            label="Year"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
        </div>
      </div>
      <q-btn
        @click="updateFilterAndCloseModal"
        class="float-right"
        color="teal"
        no-caps
        >Save</q-btn
      >
    </label>
  </label>
</template>
<script setup lang="ts">
import { FilterCriteria } from "@/use/FilterCriteria";
import { PropType, ref } from "vue";
import { date as dateHelper } from "quasar";

const emit = defineEmits(["filterOutput"]);

const monthList: Array<string> = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const month = ref<string>(
  new Date().toLocaleString("default", { month: "long" })
);
const yearList: Array<string> = ["2021", "2022", "2023"];
const year = ref<string>(
  new Date().toLocaleString("default", { year: "numeric" })
);

const updateFilterAndCloseModal = async () => {
  const currentDate = new Date(`${month.value} ${year.value}`);
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  emit(
    "filterOutput",
    new FilterCriteria([
      {
        parameter: "start_date",
        value: dateHelper.formatDate(startDate, "YYYY-MM-DD"),
      },
      {
        parameter: "end_date",
        value: dateHelper.formatDate(endDate, "YYYY-MM-DD"),
      },
    ])
  );
  closeModal();
};

const closeModal = async () => {
  document.getElementById("filter-booking-modal").checked = false;
};
</script>
