<template>
  <q-page class="flex justify-center bg-gray-50" padding>
    <div style="width: 895px">
      <div class="flex justify-between">
        <h3 class="text-2xl ml-2">Activities</h3>
        <div class="flex">
          <q-btn
            class="mr-2"
            round
            text-color="black"
            color="lightgrey"
            icon="web"
            target="_blank"
            :href="landingPageUrl"
          />

          <q-btn
            no-caps
            :to="{ name: 'activity-add' }"
            label="Add Activity"
            type="submit"
            color="teal"
            icon="add"
            style="color: typography-primary-inverted"
          />
        </div>
      </div>
      <AddWhenEmptyList
        v-if="!activities.length"
        label="Add new activity"
        to="activity-add"
      />
      <div v-else class="flex row-auto justify-around mt-4">
        <q-card
          class="m-2 rounded-md"
          flat
          bordered
          v-for="activity in activities"
          :key="activity.activity_id"
          style="width: 334px"
        >
          <q-img
            v-if="activity.image_id"
            :src="filesUrl(activity.image_id)"
            fit="cover"
            style="max-width: 334px; height: 334px"
          />
          <DefaultImage v-else :activity="activity" />
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-h5 q-mt-sm q-mb-xs">{{ activity.title }}</div>
              <div class="text-caption text-grey description">
                {{ activity.description }}
              </div>
            </q-card-section>
          </q-card-section>

          <q-separator />
          <q-card-actions>
            <q-btn
              flat
              color="primary"
              :to="{
                name: 'event-list',
                params: { activityId: activity.activity_id },
              }"
            >
              Events
            </q-btn>
            <q-space />
            <q-btn
              flat
              class
              color="primary"
              :to="{
                name: 'activity-update',
                params: { activityId: activity.activity_id },
              }"
            >
              Update
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useActivity } from "@/use/Activity";
import { Activity } from "@/types/Activity";
import AddWhenEmptyList from "@/components/button/AddWhenEmptyList.vue";
import DefaultImage from "@/components/activity/DefaultImage.vue";
import router from "@/router";
import { useAuth } from "@/use/Authentication";
import { Partner } from "@/types/Partner";

onMounted(() => {
  listActivities();
});

const { list } = useActivity();
const { getPartner } = useAuth();
const activities = ref<Activity[]>([]);
const partner: Partner = getPartner();

const listActivities = async () => {
  list(partner.partner_id as string)
    .then((result) => (activities.value = result))
    .catch((e) => {
      return router.push({ name: "not-found" });
    });
};
const filesUrl = (id: string) =>
  `${import.meta.env.VITE_API_FILES}/booking/${id}.jpg`;

const landingPageUrl =
  "https://" + window.location.host.replace("app", partner.subdomain);
</script>

<style scoped>
.description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 60px;
}
</style>
