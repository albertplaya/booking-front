<template>
  <div v-if="activity" class="image-container">
    <q-card-section
      class="flex items-center justify-center bg-gray-200 text-9xl default-image"
    >
      {{ activity.title.charAt(0).toUpperCase() }}
    </q-card-section>
    <div
      v-if="activity.location"
      class="text-bottom-right flex items-center bg-secondary/70 rounded-md p-1"
    >
      <q-icon size="1em" name="place" />
      {{ activity.location }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { Activity } from "@/types/Activity";

export default defineComponent({
  name: "DefaultImage",
  props: {
    activity: {
      type: Object as PropType<Activity>,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.default-image {
  height: 332px;
  color: $teal;
}

image-container {
  position: relative;
  text-align: center;
  color: white;
  padding-left: 0rem;
  padding-right: 0rem;
}

.text-bottom-right {
  position: absolute;
  bottom: 0.3rem;
  right: 0.3rem;
  padding-right: 0.6rem;
}
</style>
