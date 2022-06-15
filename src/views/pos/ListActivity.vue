<template>
  <q-page class="flex justify-center bg-gray-50" padding>
    <div style="width: 895px">
      <div class="flex justify-between">
        <h3 class="text-2xl ml-2">Select activity</h3>
      </div>
      <div v-if="activities.length" class="flex row-auto justify-around mt-4">
        <q-card
          class="m-2 rounded-md"
          flat
          bordered
          v-for="activity in activities"
          :key="activity.activity_id"
          style="width: 334px"
        >
          <q-card-section
            class="flex items-center justify-center bg-gray-200 text-2xl default-image"
            @click="selectActivity(activity)"
          >
            {{ activity?.title }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useActivity } from "@/use/Activity";
import { Activity } from "@/types/Activity";
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

const selectActivity = (activity: Activity) => {
  router.push({
    name: "pos-activity-event-list",
    params: { activityId: activity.activity_id },
  });
};
</script>

<style scoped lang="scss">
.default-image {
  color: $teal;
}
</style>
