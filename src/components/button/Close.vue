<template>
  <q-btn flat color="grey p-0" @click="windowClose">
    <q-icon size="2em" name="close" />
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CloseButton',
  setup() {
    const windowClose = () => {
      window.close();
    };
    return {
      windowClose
    };
  }
});
</script>
