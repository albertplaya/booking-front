<template>
  <h3 class="text-2xl ml-2">Add activity</h3>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="saveActivity" class="q-gutter-md">
      <q-input
        filled
        v-model="title"
        label="Title"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="description"
        label="Description"
        lazy-rules
        autogrow
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div>
        <q-btn class="float-right" label="Save" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useActivity } from '@/use/Activity';

export default defineComponent({
  components: {},
  setup() {
    const { create } = useActivity();

    const title = ref<string>('');
    const description = ref<string>('');
    const saveActivity = () => {
      create({
        partner_id: localStorage.partner_id as string,
        title: title.value,
        description: description.value
      });
    };
    return { title, description, saveActivity };
  }
});
</script>
