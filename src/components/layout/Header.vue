<template>
  <q-header class="bg-gray-50 text-black">
    <q-toolbar class="flex justify-between">
      <div class="text-2xl">Header</div>
      <div>
        <div v-if="auth.authenticated" class="flex flex-row visible-custom">
          <q-btn
            no-caps
            flat
            :color="currentRoute == 'activity-list' ? 'teal' : 'black'"
            icon="insert_invitation"
            label="Activities"
            :to="{ name: 'activity-list' }"
          />
          <q-btn
            no-caps
            flat
            icon="confirmation_number_outline"
            label="Bookings"
          />
          <q-btn no-caps flat color="" icon="account_circle" label="Account" />
        </div>
        <q-btn v-else @click="login" color="primary" label="login" />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent, inject, watch, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'HeaderApp',
  setup() {
    const auth: any = inject('auth');
    const store = useStore();
    const route = useRoute();
    const currentRoute = ref<string>('');

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

    watch(
      () => route.name,
      () => {
        currentRoute.value = route.name as string;
      }
    );

    return { login, logout, updateSidebar, auth, currentRoute };
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
