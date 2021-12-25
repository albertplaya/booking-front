<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 400px">
      <div class="pb-4 flex row-auto justify-between">
        <h3 class="text-2xl ml-2">Add activity</h3>
        <BackButton />
      </div>
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
          <q-btn
            class="float-right"
            label="Save"
            type="submit"
            color="primary"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
//import { useActivity } from '@/use/Activity';
import BackButton from '@/components/button/Back.vue';

export default defineComponent({
  components: { BackButton },
  setup() {
    //const { create } = useActivity();

    const title = ref<string>('');
    const description = ref<string>('');
    const triggerNegative = ref<boolean>(false);
    const saveActivity = () => {
      triggerNegative.value = true;
      /*create({
        partner_id: localStorage.partner_id as string,
        title: title.value,
        description: description.value
      });*/
    };
    return { title, description, saveActivity, triggerNegative };
  }
});
</script>
