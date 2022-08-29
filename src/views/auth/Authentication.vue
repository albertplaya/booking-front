<template></template>

<script setup lang="ts">
import { onMounted, inject } from "vue";

onMounted(() => {
  login();
});

const auth: any = inject("auth");
const login = async () => {
  if (auth.loading === false && !auth.isAuthenticated) {
    await auth.loginWithRedirect({
      appState: { targetUrl: import.meta.env.VITE_URL_LOGIN_CALLBACK },
      //redirect_uri: import.meta.env.VITE_URL_LOGIN_CALLBACK,
    });
  }
};
</script>
