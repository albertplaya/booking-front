<template>
  <q-page padding class="flex justify-center bg-gray-50">
    <div class="q-pa-md flex-grow" style="max-width: 400px">
      <div class="pb-4 flex row-auto justify-between">
        <h3 class="text-2xl ml-2">Add activity</h3>
        <BackButton />
      </div>
      <ErrorNotification :error="error" />
      <div
        class="q-pa-md pt-4 border border-solid rounded-md border-gray-200"
        style="max-width: 400px"
      >
        <q-form class="q-gutter-md pt-4">
          <ImageUploader @imageUploaded="updateImageActivity" />

          <q-input
            filled
            v-model="title"
            label="Title"
            lazy-rules
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
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
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
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useActivity } from "@/use/Activity";
import BackButton from "@/components/button/Back.vue";
import ErrorNotification from "@/components/notification/Error.vue";
import ImageUploader from "@/components/activity/ImageUploader.vue";
import { Activity } from "@/types/Activity";
import router from "@/router";
import { useAuth } from "@/use/Authentication";
import { Partner } from "@/types/Partner";

const { create } = useActivity();
const { getPartner } = useAuth();

const title = ref<string>("");
const description = ref<string>("");
const activityImageId = ref<string | null>(null);
const error = ref<any>("");

const updateImageActivity = (imageId: string): void => {
  activityImageId.value = imageId;
};

const saveActivity = () => {
  const partner: Partner = getPartner();
  create({
    partner_id: partner.partner_id as string,
    title: title.value,
    description: description.value,
    image_id: activityImageId.value,
  } as Activity)
    .then(() => router.push({ name: "activity-list" }))
    .catch((err) => {
      error.value = err;
    });
};
</script>
