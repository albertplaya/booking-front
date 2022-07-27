<template>
  <q-page padding class="flex justify-center bg-gray-50">
    <div class="q-pa-md flex-grow" style="max-width: 400px">
      <div class="pb-4 flex row-auto justify-between">
        <h3 class="text-2xl ml-2">Add pass</h3>
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
            v-model="title"
            label="Title"
            lazy-rules
            :error="formErrors.get('title') != null"
            :error-message="formErrors.get('title')?.message"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="description"
            label="Description"
            lazy-rules
            :error="formErrors.get('description') != null"
            :error-message="formErrors.get('description')?.message"
          />

          <q-input
            filled
            v-model="quantity"
            label="Quantity"
            lazy-rules
            autogrow
            :error="formErrors.get('quantity') != null"
            :error-message="formErrors.get('quantity')?.message"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="price"
            label="Price"
            lazy-rules
            autogrow
            :error="formErrors.get('price') != null"
            :error-message="formErrors.get('price')?.message"
          >
            <template v-slot:append>
              <q-icon name="euro" />
            </template>
          </q-input>
        </q-form>
      </div>

      <div class="pt-4" style="max-width: 400px">
        <q-btn
          @click="savePass"
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
import { usePass } from "@/use/Pass";
import BackButton from "@/components/button/Back.vue";
import ErrorNotification from "@/components/notification/ErrorNotification.vue";
import { Pass } from "@/types/Pass";
import router from "@/router";
import { useAuth } from "@/use/Authentication";
import { Partner } from "@/types/Partner";
import { InputErrorResponse } from "@/types/Form/ErrorResponse";

const { createPass } = usePass();
const { getPartner } = useAuth();

const title = ref<string>("");
const description = ref<string>();
const quantity = ref<number>(10);
const price = ref<number>(0);
const currency = ref<string>("EUR");
const error = ref<string>("");
const formErrors = ref(new Map<string, InputErrorResponse>());

const savePass = () => {
  const partner: Partner = getPartner();
  createPass({
    partner_id: partner.partner_id as string,
    title: title.value,
    description: description.value,
    quantity: quantity.value,
    price: price.value,
    currency: currency.value,
  } as Pass)
    .then(() => router.push({ name: "pass-list" }))
    .catch((errorResult) => {
      if (typeof errorResult === "string") {
        error.value = errorResult;
      } else {
        formErrors.value = errorResult.errors;
      }
    });
};
</script>
