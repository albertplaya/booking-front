<template>
  <q-page padding class="flex-1 justify-center bg-gray-50">
    <div class="flex justify-center">
      <div>
        <div class="pb-4 flex row-auto justify-between">
          <h3 class="text-2xl ml-2">Update activity</h3>
          <BackButton />
        </div>
        <ErrorNotification :error="error" />
        <div
          v-if="activity"
          class="q-pa-md pt-4 border border-solid rounded-md border-gray-200"
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
              :error="formErrors.get('title') != null"
              :error-message="formErrors.get('title')?.message"
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
              :error="formErrors.get('description') != null"
              :error-message="formErrors.get('decription')?.message"
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-input
              filled
              v-model="activity.location"
              label="Location"
              lazy-rules
              autogrow
              :error="formErrors.get('lcoation') != null"
              :error-message="formErrors.get('location')?.message"
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
              :error="formErrors.get('price') != null"
              :error-message="formErrors.get('price')?.message"
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

        <div class="pt-4 q-gutter-sm" style="max-width: 400px">
          <q-btn
            @click="updateActivity"
            no-caps
            style="color: typography-primary-inverted"
            class="float-right"
            label="Save"
            type="submit"
            color="teal"
          />
          <q-btn
            no-caps
            class="float-right"
            label="Delete"
            type="submit"
            color="rhubarb"
            @click="deleteActivity"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useActivity } from "@/use/Activity";
import BackButton from "@/components/button/Back.vue";
import ErrorNotification from "@/components/notification/ErrorNotification.vue";
import { Activity } from "@/types/Activity";
import ImageUploader from "@/components/activity/ImageUploader.vue";
import router from "@/router";
import { InputErrorResponse } from "@/types/Form/ErrorResponse";

const props = defineProps({
  activityId: {
    type: String,
    default: "",
  },
});

const { get, update, remove } = useActivity();

const activity = ref<Activity>();
const error = ref<string>("");
const formErrors = ref(new Map<string, InputErrorResponse>());

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
  if (!activity.value) {
    return;
  }

  update({
    ...activity.value,
    price: activity.value.price * 100,
  } as Activity)
    .then(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push({ name: "activity-list" });
    })
    .catch((errorResult) => {
      if (typeof errorResult === "string") {
        error.value = errorResult;
      } else {
        formErrors.value = errorResult.errors;
      }
    });
};

const deleteActivity = () => {
  if (!activity.value) {
    return;
  }

  remove(activity.value.activity_id)
    .then(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push({ name: "activity-list" });
    })
    .catch((err) => {
      error.value = err;
    });
};
</script>

<style lang="scss" scoped>
.bg-rhubarb {
  background: $rhubarb !important;
}
</style>
