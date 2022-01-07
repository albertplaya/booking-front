<template>
  <q-btn no-caps flat color="primary" @click="back">
    <q-icon left size="2em" name="arrow_back" />
    <div>Back</div>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BackButton',
  setup() {
    const back = (): void => {
      history.back();
    };
    return {
      back
    };
  }
});
</script>
