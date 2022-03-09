<template>
  <q-card-section
    class="flex items-center justify-center bg-gray-200 text-9xl default-image"
  >
    {{ activity?.title.charAt(0).toUpperCase() }}
  </q-card-section>
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
</style>
