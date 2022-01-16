<template>
  <q-page class="flex justify-center bg-gray-50" padding>
    <div style="width: 895px">
      <div class="flex justify-between">
        <h3 class="text-2xl ml-2">Activities</h3>
        <q-separator />
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
      <AddWhenEmptyList
        v-if="!activities.length"
        label="Add new activity"
        to="activity-add"
      />
      <div v-else class="flex row-auto justify-around mt-4">
        <q-card
          class="my-card m-2"
          flat
          bordered
          v-for="activity in activities"
          :key="activity.activity_id"
          style="width: 350px"
        >
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
                params: { activityId: activity.activity_id.value }
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
                params: { activityId: activity.activity_id.value }
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

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useActivity } from '@/use/Activity';
import { Activity } from '@/types/Activity';
import AddWhenEmptyList from '@/components/button/AddWhenEmptyList.vue';
import router from '@/router';

export default defineComponent({
  components: { AddWhenEmptyList },
  mounted() {
    this.listActivities();
  },
  setup() {
    const { list } = useActivity();
    const activities = ref<Activity[]>([]);

    const listActivities = async () => {
      list(localStorage.partner_id as string)
        .then((result) => (activities.value = result))
        .catch(() => {
          return router.push({ name: 'not-found' });
        });
    };
    return { activities, listActivities };
  }
});
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
