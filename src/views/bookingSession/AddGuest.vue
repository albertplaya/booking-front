<template>
  <q-page class="flex justify-center items-center bg-white" padding>
    <div class="q-pa-md flex-grow" style="max-width: 400px">
      <div class="pb-4 flex row-auto justify-between" style="min-width: 320px">
        <h3 class="text-2xl">Add guest</h3>
        <BackButton />
      </div>
      <ErrorNotification :error="error" />
      <div
        class="q-pa-md m-2 border border-solid rounded-md border-gray-200"
        style="max-width: 400px"
      >
        <q-form class="q-gutter-md">
          <q-input
            v-model="name"
            filled
            label="Name"
            lazy-rules
            autogrow
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            v-model="lastName"
            filled
            label="Last name"
            lazy-rules
            autogrow
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="email"
            filled
            lazy-rules
            autogrow
            label="Email"
            type="email"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="phone"
            filled
            lazy-rules
            autogrow
            label="Phone"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
        </q-form>
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
import { defineProps, onMounted, ref } from "vue";
import { useBookingSession } from "@/use/BookingSession";
import BackButton from "@/components/button/Back.vue";
import ErrorNotification from "@/components/notification/Error.vue";
import router from "@/router";
import { Guest } from "@/types/Guest";
import { ulid } from "ulid";

const props = defineProps({
  eventId: {
    type: String,
    default: "",
  },
});

onMounted(() => {
  initBookingSession(props.eventId);
});

const { initBookingSession, addGuest } = useBookingSession();

const name = ref<string>("");
const lastName = ref<string>("");
const email = ref<string>("");
const phone = ref<string>("");
const error = ref<any>("");

const addGuestSession = () => {
  addGuest(props.eventId, {
    guest_id: ulid(),
    first_name: name.value,
    last_name: lastName.value,
    email: email.value,
    phone: phone.value,
  } as Guest)
    .then(() => {
      router.push({
        name: "booking-thankyou",
        params: { eventId: props.eventId },
      });
    })
    .catch((err) => {
      error.value = err;
    });
};
</script>
