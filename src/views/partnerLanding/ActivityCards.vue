<template>
  <q-page class="flex justify-center bg-gray-50" padding>
    <div style="">
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
          <router-link
            :to="{
              name: 'activity-events-list',
              params: { activityId: activity.activity_id.value },
            }"
          >
            <q-img
              v-if="activity.image_id"
              :src="filesUrl(activity.image_id.value)"
              fit="cover"
              style="max-width: 334px; height: 334px"
            >
              <div class="absolute-bottom text-subtitle2 text-center">
                {{ activity.title }}
              </div>
            </q-img>
            <DefaultImage v-else :activity="activity" />
          </router-link>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useActivity } from "@/use/Activity";
import { Activity } from "@/types/Activity";
import AddWhenEmptyList from "@/components/button/AddWhenEmptyList.vue";
import DefaultImage from "@/components/activity/DefaultImage.vue";
import router from "@/router";

export default defineComponent({
  components: { AddWhenEmptyList, DefaultImage },
  props: {
    partnerId: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.listActivities();
  },
  setup(props) {
    const { list } = useActivity();
    const activities = ref<Activity[]>([]);

    const listActivities = async () => {
      console.log(props.partnerId);
      list(props.partnerId)
        .then((result) => (activities.value = result))
        .catch(() => {
          return router.push({ name: "not-found" });
        });
    };
    const filesUrl = (id: string) =>
      `${import.meta.env.VITE_API_FILES}/booking/${id}.jpg`;
    return { activities, filesUrl, listActivities };
  },
});
</script>

<style scoped></style>
