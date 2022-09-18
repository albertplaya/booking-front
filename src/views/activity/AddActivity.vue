<template>
  <q-page padding class="flex-1 bg-gray-50">
    <div class="flex justify-center">
      <div>
        <div class="pb-4 flex row-auto justify-between">
          <h3 class="text-2xl ml-2">Add activity</h3>
          <BackButton />
        </div>
        <ErrorNotification v-if="error" :error="error" />
        <div
          class="q-pa-md pt-4 border border-solid rounded-md border-gray-200"
        >
          <q-form class="q-gutter-md pt-4">
            <ImageUploader @imageUploaded="updateImageActivity" />

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
              autogrow
              :error="formErrors.get('description') != null"
              :error-message="formErrors.get('description')?.message"
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-input
              filled
              v-model="location"
              label="Location"
              lazy-rules
              autogrow
              :error="formErrors.get('location') != null"
              :error-message="formErrors.get('location')?.message"
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
            @click="saveActivity"
            no-caps
            style="color: typography-primary-inverted"
            class="float-right"
            label="Save"
            type="submit"
            color="teal"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useActivity } from "@/use/Activity";
import BackButton from "@/components/button/Back.vue";
import ErrorNotification from "@/components/notification/ErrorNotification.vue";
import ImageUploader from "@/components/activity/ImageUploader.vue";
import { Activity } from "@/types/Activity";
import router from "@/router";
import { useAuth } from "@/use/Authentication";
import { Partner } from "@/types/Partner";
import { ErrorResponse, InputErrorResponse } from "@/types/Form/ErrorResponse";

const { create } = useActivity();
const { getPartner } = useAuth();

const title = ref<string>("");
const description = ref<string>("");
const location = ref<string | null>(null);
const price = ref<number>(0);
const currency = ref<string>("EUR");
const activityImageId = ref<string | null>(null);
const error = ref<string>("");
const formErrors = ref(new Map<string, InputErrorResponse>());

const updateImageActivity = (imageId: string): void => {
  activityImageId.value = imageId;
};

const saveActivity = () => {
  const partner: Partner = getPartner();
  create({
    partner_id: partner.partner_id as string,
    title: title.value,
    description: description.value,
    price: price.value * 100,
    currency: currency.value,
    location: location.value,
    image_id: activityImageId.value,
  } as Activity)
    .then(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push({ name: "activity-list" });
    })
    .catch((errorResult: ErrorResponse | string) => {
      if (typeof errorResult === "string") {
        error.value = errorResult;
      } else {
        formErrors.value = errorResult.errors;
      }
    });
};
</script>
