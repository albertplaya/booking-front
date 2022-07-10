<template>
  <div
    v-if="selected"
    class="pass pass-selected"
    style="width: 250px; height: 120px"
    flat
    bordered
  >
    <div class="text-xl font-bold">
      {{ pass.title }}
    </div>
    <div class="flex flex-row justify-between items-center">
      <div class="flex items-center text-sm">
        {{ pass.current_quantity }}/{{ pass.quantity }}
        <q-icon class="ml-1" size="2em" name="local_activity" />
      </div>
      <div class="text-sm">
        {{ pass.price / 100 }}
        {{ pass.currency }}
      </div>
    </div>
  </div>
  <div v-else class="pass" style="width: 250px; height: 120px" flat bordered>
    <div class="text-xl font-bold">
      {{ pass.title }}
    </div>
    <div class="flex flex-row justify-between items-center">
      <div class="flex items-center text-sm">
        {{ pass.current_quantity }}/{{ pass.quantity }}
        <q-icon class="ml-1" size="2em" name="local_activity" />
      </div>
      <div class="text-sm">
        {{ pass.price / 100 }}
        {{ pass.currency }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import { GuestPass } from "@/types/GuestPass";

const props = defineProps({
  pass: {
    type: Object as PropType<GuestPass>,
    required: true,
  },
  selected: {
    type: Boolean,
  },
});
</script>

<style scoped lang="scss">
.pass {
  cursor: pointer;
  @apply bg-white m-2 p-3 rounded-md border-gray-200 border-2 flex flex-col justify-around;
}
.pass:hover {
  --tw-bg-opacity: 1;
  background-color: $light-teal !important;
}

.pass.pass-selected {
  background-color: $light-teal;
}
</style>
