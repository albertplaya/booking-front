<template>
  <q-layout view="hHh LpR fFf">
    <Header />
    <Sidebar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/layout/Header.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
export default defineComponent({
  components: { Header, Sidebar },
  setup() {
    return {
      Header,
      Sidebar
    };
  }
});
</script>
