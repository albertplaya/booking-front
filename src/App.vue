<template>
  <div v-if="showLayout">
    <q-layout view="hHh LpR fFf">
      <Header />
      <Sidebar />
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
  <div v-else>
    <q-layout view="hHh lpR fFf">
      <q-page-container class="a flex justify-center">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/layout/Header.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
export default defineComponent({
  components: { Header, Sidebar },
  setup() {
    const showLayout = window.location.pathname.split('/')[1] !== 'booking';
    return {
      Header,
      Sidebar,
      showLayout
    };
  }
});
</script>
