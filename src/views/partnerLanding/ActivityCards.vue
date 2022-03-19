<template>
  <q-page class="flex justify-center bg-gray-50" padding>
    <div style="max-width: 895px">
      <AddWhenEmptyList
        v-if="!activities.length"
        label="Add new activity"
        to="activity-add"
      />
      <div v-else class="flex row-auto justify-around mt-4">
        <ActivityCard v-for="activity in activities" :activity="activity" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useActivity } from "@/use/Activity";
import { Activity } from "@/types/Activity";
import AddWhenEmptyList from "@/components/button/AddWhenEmptyList.vue";
import ActivityCard from "@/components/partnerLanding/ActivityCard.vue";
import router from "@/router";

export default defineComponent({
  components: { AddWhenEmptyList, ActivityCard },
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
      list(props.partnerId)
        .then((result) => (activities.value = result))
        .catch(() => {
          return router.push({ name: "not-found" });
        });
    };

    return { activities, listActivities };
  },
});
</script>
