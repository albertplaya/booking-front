<template>
  <div data-theme="obboco" v-if="showLanding">
    <q-layout view="hHh lpR fFf">
      <q-page-container class="flex justify-center bg-gray-200">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
  <div data-theme="obboco" v-else>
    <q-layout view="hHh lpR fFf">
      <q-page-container class="bg-gray-50 lg:flex md:flex">
        <Header />
        <SideBar />
        <router-view />
      </q-page-container>
      <FooterMobile />
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Header from "@/components/layout/Header.vue";
import SideBar from "@/components/layout/SideBar.vue";
import FooterMobile from "@/components/layout/FooterMobile.vue";
import { useAuth } from "@/use/Authentication";
import router from "@/router";
import { useRoute } from "vue-router";

let subdomain = window.location.host.split(".")[0];
const showLanding = subdomain !== "app";
</script>

<style scoped></style>
