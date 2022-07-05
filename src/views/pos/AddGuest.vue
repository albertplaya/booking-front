<template>
  <q-page class="flex justify-center bg-white" padding>
    <div class="q-pa-md flex-grow" style="max-width: 400px">
      <div class="pb-4 flex row-auto justify-between" style="min-width: 320px">
        <h3 class="text-2xl">Add guest</h3>
        <BackButton />
      </div>
      <ErrorNotification :error="error" />
      <div class="my-5" style="max-width: 400px">
        <q-select
          filled
          v-model="currentGuest"
          use-input
          input-debounce="0"
          label="Add guest"
          :options="options"
          @filter="filterByGuestName"
          behavior="menu"
          map-options
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div style="max-width: 400px">
        <q-btn
          class="float-right"
          label="Save"
          type="submit"
          color="primary"
          @click="addGuestSession"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useBookingSession } from "@/use/BookingSession";
import { useGuest } from "@/use/Guest";
import BackButton from "@/components/button/Back.vue";
import ErrorNotification from "@/components/notification/Error.vue";
import router from "@/router";
import { Guest } from "@/types/Guest";
import { useAuth } from "@/use/Authentication";
import { Partner } from "@/types/Partner";

const props = defineProps({
  eventId: {
    type: String,
    default: "",
  },
});

onMounted(() => {
  initBookingSession(props.eventId);
  getGuests();
});

const { initBookingSession, addGuest, finishBookingSession } =
  useBookingSession();
const { list } = useGuest();
const { getPartner } = useAuth();

const error = ref<string>("");

const partner: Partner = getPartner();
const currentGuest = ref<{ label: string; value: Guest }>();
const stringOptions = ref<{ label: string; value: Guest }[]>([]);
const options = ref<{ label: string; value: Guest }[]>([]);

const getGuests = async () => {
  list(partner.partner_id as string).then((result) => {
    stringOptions.value = result.map((guest: Guest) => {
      return { value: guest, label: guest.first_name + " " + guest.last_name };
    });
  });
};

const filterByGuestName = (value: string, update: any) => {
  if (value === "") {
    update(() => {
      options.value = stringOptions.value;
    });
    return;
  }

  update(() => {
    const needle = value.toLowerCase();
    options.value = stringOptions.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

const addGuestSession = async () => {
  if (!currentGuest.value) {
    error.value = "No guest selected";
    return;
  }

  const partner = getPartner();
  await addGuest(props.eventId, currentGuest.value.value as Guest).catch(
    (err) => {
      error.value = err;
    }
  );
  await new Promise((resolve) => setTimeout(resolve, 500));
  await finishBookingSession(props.eventId)
    .then(() => {})
    .catch((err) => {
      error.value = err;
    });
  await new Promise((resolve) => setTimeout(resolve, 500));
  router.push({
    name: "booking-list",
  });
};
</script>
