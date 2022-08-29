<template></template>

<script setup lang="ts">
import { onMounted, inject } from "vue";

onMounted(() => {
  login();
});

const auth: any = inject("auth");
const login = () => {
  auth.loginWithRedirect({
    redirect_uri: import.meta.env.VITE_URL_LOGIN_CALLBACK,
  });
};
</script>
