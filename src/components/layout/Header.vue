<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Header</q-toolbar-title>
      </q-toolbar>

      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        Title
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'HeaderApp',
  setup() {
    const auth: any = inject('auth');

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
    return { login, logout, auth };
  }
});
</script>
