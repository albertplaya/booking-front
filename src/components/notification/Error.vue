<template>
  <div v-if="error" class="my-2 rounded-md text-lg flex items-center">
    <q-icon left size="2rem" style="color: #9e5957" name="o_info" />
    <div style="color: #9e5957">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotification",
  props: {
    error: {
      type: String,
      required: true,
    },
  },
});
</script>
