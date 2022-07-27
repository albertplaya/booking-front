<template>
  <q-page padding class="flex justify-center bg-gray-50">
    <div class="q-pa-md flex-grow" style="max-width: 400px">
      <div class="pb-4 flex row-auto justify-between">
        <h3 class="text-2xl ml-2">Add guest</h3>
        <BackButton />
      </div>
      <ErrorNotification :error="error" />
      <div
        class="q-pa-md pt-4 border border-solid rounded-md border-gray-200"
        style="max-width: 400px"
      >
        <q-form class="q-gutter-md pt-4">
          <q-input
            filled
            v-model="firstName"
            label="First Name"
            lazy-rules
            :error="formErrors.get('first_name') != null"
            :error-message="formErrors.get('first_name')?.message"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="lastName"
            label="Last Name"
            lazy-rules
            autogrow
            :error="formErrors.get('last_name') != null"
            :error-message="formErrors.get('last_name')?.message"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="email"
            label="Email"
            lazy-rules
            autogrow
            :error="formErrors.get('email') != null"
            :error-message="formErrors.get('email')?.message"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="phone"
            label="Phone"
            lazy-rules
            autogrow
            :error="formErrors.get('phone') != null"
            :error-message="formErrors.get('phone')?.message"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
        </q-form>
      </div>

      <div class="pt-4" style="max-width: 400px">
        <q-btn
          @click="saveGuest"
          no-caps
          style="color: typography-primary-inverted"
          class="float-right"
          label="Save"
          type="submit"
          color="teal"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGuest } from "@/use/Guest";
import BackButton from "@/components/button/Back.vue";
import ErrorNotification from "@/components/notification/ErrorNotification.vue";
import router from "@/router";
import { useAuth } from "@/use/Authentication";
import { Partner } from "@/types/Partner";
import { Guest } from "@/types/Guest";
import { ErrorResponse, InputErrorResponse } from "@/types/Form/ErrorResponse";

const { createGuest } = useGuest();
const { getPartner } = useAuth();

const firstName = ref<string>("");
const lastName = ref<string>("");
const email = ref<string>("");
const phone = ref<string>("");
const error = ref<string>("");
const formErrors = ref(new Map<string, InputErrorResponse>());

const saveGuest = () => {
  const partner: Partner = getPartner();
  createGuest({
    partner_id: partner.partner_id,
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    phone: phone.value,
  } as Guest)
    .then(() => router.push({ name: "guest-list" }))
    .catch((errorResult: ErrorResponse | string) => {
      if (typeof errorResult === "string") {
        error.value = errorResult;
      } else {
        formErrors.value = errorResult.errors;
      }
    });
};
</script>
