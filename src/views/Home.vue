<template>
  <div class="flex flex-row">
    <Sidebar class="shrink" />
    <div>
      <Header />
      <h1>Home</h1>
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import Header from '@/components/layout/Header.vue';

export default defineComponent({
  name: 'HomeApp',
  components: {
    Sidebar,
    Header
  },
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
