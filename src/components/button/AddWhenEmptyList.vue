<template>
  <div class="flex justify-center">
    <q-btn
      class="p-10 m-3 full-width"
      outline
      color="grey"
      size="xl"
      :to="{ name: to }"
    >
      <q-icon left size="2em" name="add" />
      <div>{{ label }}</div>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddWhenEmptyList',
  props: {
    label: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return {
      props
    };
  }
});
</script>
