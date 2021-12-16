<template>
  <q-page padding>
    <h3 class="text-2xl ml-2">Add event</h3>
    <div
      class="q-pa-md m-2 border border-solid rounded-md border-gray-200"
      style="max-width: 400px"
    >
      <q-form class="q-gutter-md">
        <q-input filled v-model="date">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input filled v-model="time" mask="time" :rules="['time']">
          <template v-slot:prepend>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time
                  v-model="time"
                  format24h
                  now-btn
                  :minute-options="[0, 15, 30, 45]"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          filled
          v-model="duration"
          label="Duration in minuts"
          lazy-rules
          autogrow
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          v-model="capacity"
          label="Number of participants"
          lazy-rules
          autogrow
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </q-form>
    </div>
    <div style="max-width: 400px">
      <q-btn
        @click="saveEvent"
        class="float-right"
        label="Save"
        type="submit"
        color="primary"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useEvent } from '@/use/Event';

export default defineComponent({
  components: {},
  props: {
    activityId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { create } = useEvent();

    const date = ref<string>('2021-02-01');
    const time = ref<string>('12:44');
    const duration = ref<string>('30');
    const capacity = ref<string>('10');
    const saveEvent = () => {
      create({
        start_date: date.value + ' ' + time.value,
        duration: duration.value,
        capacity: capacity.value,
        activity_id: props.activityId
      });
    };
    return { date, time, duration, capacity, saveEvent };
  }
});
</script>
