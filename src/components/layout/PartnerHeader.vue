<template>
  <div class="bg-gray-50 text-black p-4">
    <div class="text-3xl">
      {{ partner.given_name }} {{ partner.family_name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Partner } from "@/types/Partner";
import { PropType } from "vue";

const props = defineProps({
  partner: {
    type: Object as PropType<Partner>,
    required: true,
  },
});
</script>
