<template>
  <q-page class="flex justify-center bg-gray-50" padding>
    <div style="width: 895px">
      <div class="flex justify-between mb-2">
        <q-btn
          v-if="eventListButton === 'upcoming'"
          no-caps
          rounded
          label="Past events"
          type="submit"
          color="grey"
          @click="listPastEvents"
        />
        <q-btn
          v-if="eventListButton === 'past'"
          no-caps
          rounded
          label="Upcoming events"
          type="submit"
          color="grey"
          @click="listUpcommingEvents"
        />
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
    this.listUpcommingEvents();
  },
  setup(props) {
    const { listUpcomming, listPast } = useEvent();
    const events = ref<Event[]>([]);
    const eventListButton = ref<string>("upcoming");

    const listUpcommingEvents = async () => {
      listUpcomming(props.activityId)
        .then((result) => (events.value = result))
        .catch(() => {
          return router.push({ name: "not-found" });
        });
      eventListButton.value = "upcoming";
    };

    const listPastEvents = async () => {
      listPast(props.activityId)
        .then((result) => (events.value = result))
        .catch(() => {
          return router.push({ name: "not-found" });
        });
      eventListButton.value = "past";
    };

    return { events, listUpcommingEvents, listPastEvents, eventListButton };
  },
});
</script>
