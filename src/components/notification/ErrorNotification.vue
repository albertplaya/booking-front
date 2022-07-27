<template>
  <div v-if="error" class="my-2 rounded-md text-lg flex items-center">
    <q-icon left size="1.3rem" style="color: #9e5957" name="o_info" />
    <div style="color: #9e5957">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: {
    type: String,
    default: "",
  },
});
</script>
