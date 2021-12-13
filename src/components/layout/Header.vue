<template>
  <va-navbar class="mb-4">
    <template #left>
      <va-navbar-item>Left</va-navbar-item>
    </template>
    <template #center>
      <va-navbar-item>Center</va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item>Right</va-navbar-item>
    </template>
  </va-navbar>
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
