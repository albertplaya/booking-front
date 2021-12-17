<template>
  <q-page padding style="max-width: 864px">
    <div class="flex justify-between">
      <h3 class="text-2xl ml-2">Activities</h3>
      <q-separator />
      <q-btn label="Add" type="submit" color="primary" />
    </div>
    <div class="flex row-auto">
      <q-card
        class="my-card m-2"
        flat
        bordered
        v-for="activity in activities"
        :key="activity.activity_id"
        style="width: 400px"
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
          <q-btn flat color="primary"> Events </q-btn>
          <q-space />
          <q-btn flat class color="primary"> Update </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useActivity } from '@/use/Activity';
import { Activity } from '@/types/Activity';

export default defineComponent({
  components: {},
  mounted() {
    this.listActivities();
  },
  setup() {
    const { list } = useActivity();
    const activities = ref<Activity[]>([]);

    const listActivities = async () => {
      console.log('listActivities');
      activities.value = await list(localStorage.partner_id as string);
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
