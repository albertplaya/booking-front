<template>
  <div class="visible sm:invisible">
    <q-footer
      elevated
      class="bg-gray-50 text-black flex justify-around"
      style="height: 52.8px"
      v-if="auth.authenticated"
    >
      <q-btn flat round icon="insert_invitation" />
      <q-btn flat round icon="confirmation_number_outline" />
      <q-btn flat round icon="account_circle" />
    </q-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'FooterMobile',
  setup() {
    const auth: any = inject('auth');
    return { auth };
  }
});
</script>

<style scoped>
.visible-custom {
  visibility: hidden;
}
@media only screen and (min-width: 640px) {
  .visible-custom {
    visibility: visible !important;
  }
}
</style>
