<template>
  <q-page class="flex justify-center bg-gray-50" padding>
    <div style="width: 895px">
      <div class="flex justify-between">
        <q-separator />
        <q-btn
          no-caps
          label="Add Event"
          type="submit"
          color="teal"
          :to="{
            name: 'event-add',
            params: { activityId: activityId },
          }"
        />
      </div>
      <AddWhenEmptyList
        v-if="!events.length"
        label="Add new event"
        to="event-add"
      />
      <ListEvent v-else :events="events" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useEvent } from "@/use/Event";
import { Event } from "@/types/Event";
import AddWhenEmptyList from "@/components/button/AddWhenEmptyList.vue";
import router from "@/router";
import ListEvent from "@/components/event/ListEvent.vue";

export default defineComponent({
  components: { AddWhenEmptyList, ListEvent },
  props: {
    activityId: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.listEvents();
  },
  setup(props) {
    const { list } = useEvent();
    const events = ref<Event[]>([]);

    const listEvents = async () => {
      list(props.activityId)
        .then((result) => (events.value = result))
        .catch(() => {
          return router.push({ name: "not-found" });
        });
    };
    return { events, listEvents };
  },
});
</script>
