<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Header</q-toolbar-title>
      </q-toolbar>
      <q-btn
        v-if="auth.authenticated"
        @click="logout"
        color="primary"
        label="logout"
      />
      <q-btn v-else @click="login" color="primary" label="login" />
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

    console.log(auth.authenticated);
    return { login, logout, auth };
  }
});
</script>
