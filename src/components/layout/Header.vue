<template>
  <q-header class="bg-gray-50 text-black">
    <q-toolbar>
      <q-toolbar-title style="width: 300px">Header</q-toolbar-title>
      <div v-if="auth.authenticated" class="flex flex-row visible-custom">
        <q-btn flat icon="insert_invitation" label="Activities" />
        <q-btn
          flat
          color=""
          icon="confirmation_number_outline"
          label="Bookings"
        />
        <q-btn flat color="" icon="account_circle" label="Account" />
      </div>
      <q-btn v-else @click="login" color="primary" label="login" />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'HeaderApp',
  setup() {
    const auth: any = inject('auth');
    const store = useStore();

    const login = () => {
      auth.loginWithPopup({
        redirect_uri: 'http://localhost:8080/'
      });
    };
    const logout = () => {
      auth.logout({
        returnTo: window.location.origin
      });
    };

    const updateSidebar = () => {
      store.dispatch('app/toggleSideBar');
    };

    return { login, logout, updateSidebar, auth };
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
