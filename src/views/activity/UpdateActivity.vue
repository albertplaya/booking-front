<template>
  <q-page padding class="flex justify-center bg-gray-50">
    <div class="q-pa-md flex-grow" style="max-width: 400px">
      <div class="pb-4 flex row-auto justify-between">
        <h3 class="text-2xl ml-2">Update activity</h3>
        <BackButton />
      </div>
      <ErrorNotification :error="error" />
      <div
        v-if="activity"
        class="q-pa-md pt-4 border border-solid rounded-md border-gray-200"
        style="max-width: 400px"
      >
        <q-form class="q-gutter-md pt-4">
          <ImageUploader
            @imageUploaded="updateImageActivity"
            :activityImageId="activity.image_id ? activity.image_id : null"
          />

          <q-input
            filled
            v-model="activity.title"
            label="Title"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="activity.description"
            label="Description"
            lazy-rules
            autogrow
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="activity.price"
            label="Price"
            lazy-rules
            autogrow
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          >
            <template v-slot:append>
              <q-icon name="euro" />
            </template>
          </q-input>
        </q-form>
      </div>

      <div class="pt-4" style="max-width: 400px">
        <q-btn
          @click="updateActivity"
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
import { defineProps, onMounted, ref } from "vue";
import { useActivity } from "@/use/Activity";
import BackButton from "@/components/button/Back.vue";
import ErrorNotification from "@/components/notification/Error.vue";
import { Activity } from "@/types/Activity";
import ImageUploader from "@/components/activity/ImageUploader.vue";
import router from "@/router";

const props = defineProps({
  activityId: {
    type: String,
    default: "",
  },
});

const { get, update } = useActivity();

const activity = ref<Activity>();
const error = ref<any>("");

onMounted(() => {
  getActivity(props.activityId);
});

const getActivity = async (activityId: string) => {
  get(activityId)
    .then((result: Activity) => {
      activity.value = {
        ...result,
        price: result.price / 100,
      };
    })
    .catch(() => {
      return router.push({ name: "not-found" });
    });
};

const updateImageActivity = (imageId: string): void => {
  activity.value.image_id = imageId;
};

const updateActivity = () => {
  update({
    ...activity.value,
    price: activity.value.price * 100,
  } as Activity)
    .then(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push({ name: "activity-list" });
    })
    .catch((err) => {
      error.value = err;
    });
};
</script>
