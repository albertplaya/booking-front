<template>
  <div data-theme="bookingcat" v-if="showAppLayout">
    <q-layout view="hHh lpR fFf">
      <Header />
      <FooterMobile />
      <q-page-container class="bg-gray-50">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
  <div data-theme="bookingcat" v-else>
    <q-layout view="hHh lpR fFf">
      <q-page-container class="flex justify-center bg-gray-200">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/layout/Header.vue";
import FooterMobile from "@/components/layout/FooterMobile.vue";
import { useAuth } from "@/use/Authentication";

let subdomain = window.location.host.split(".")[0];
const showAppLayout = subdomain === "app";
const { authPartner } = useAuth();
authPartner();
</script>
