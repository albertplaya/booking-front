<template>
  <q-page class="flex justify-center bg-white" padding>
    <div class="q-pa-md flex-grow" style="max-width: 400px">
      <div class="pb-4 flex row-auto justify-between" style="min-width: 320px">
        <h3 class="text-2xl">Add guest & pass</h3>
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
        <div v-if="guestPasses && guestPasses.length">
          <h3 class="mt-6 text-lg font-bold">Assign pass</h3>
          <div
            class="flex justify-around mt-4"
            v-for="guestPass in guestPasses"
            :key="guestPass.pass_id"
          >
            <GuestPassCard
              v-if="guestPass.current_quantity < guestPass.quantity"
              :pass="guestPass"
              :selected="selectedPass == guestPass"
              @click="selectPass(guestPass)"
            />
          </div>
        </div>
      </div>
      <div style="max-width: 400px">
        <q-btn
          class="float-right"
          label="Save"
          type="submit"
          color="primary"
          @click="addGuestPassAndBookingSession"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useBookingSession } from "@/use/BookingSession";
import { useGuest } from "@/use/Guest";
import BackButton from "@/components/button/Back.vue";
import ErrorNotification from "@/components/notification/Error.vue";
import router from "@/router";
import { Guest } from "@/types/Guest";
import { Pass } from "@/types/Pass";
import { useAuth } from "@/use/Authentication";
import { Partner } from "@/types/Partner";
import { useGuestPass } from "@/use/GuestPass";
import { GuestPass } from "@/types/GuestPass";
import GuestPassCard from "@/components/pass/GuestPassCard.vue";

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
const { listGuest } = useGuest();
const { getPartner } = useAuth();
const { getGuestPassesByGuest } = useGuestPass();

const error = ref<string>("");

const partner: Partner = getPartner();
const currentGuest = ref<{ label: string; value: Guest }>();
const stringOptions = ref<{ label: string; value: Guest }[]>([]);
const options = ref<{ label: string; value: Guest }[]>([]);
const guestPasses = ref<GuestPass[]>();
const selectedPass = ref<GuestPass>();

const getGuests = async () => {
  listGuest(partner.partner_id as string).then((result) => {
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

const getGuestPassesByGuestAction = async (guestId: string) => {
  getGuestPassesByGuest(guestId).then((result) => (guestPasses.value = result));
};

watch(
  () => currentGuest.value,
  () => {
    if (currentGuest.value) {
      getGuestPassesByGuestAction(currentGuest.value.value.guest_id);
    }
  }
);

const selectPass = (pass: GuestPass) => {
  selectedPass.value = pass;
};

const addGuestPassAndBookingSession = async () => {
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
  const bookingType: string = selectedPass.value ? "pass" : "direct";
  const guestPassId: string | null = selectedPass.value
    ? selectedPass.value.guest_pass_id
    : null;
  await finishBookingSession(props.eventId, "pos", bookingType, guestPassId)
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
