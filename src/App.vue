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
import { defineComponent, ref } from 'vue';
import Header from '@/components/layout/Header.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
export default defineComponent({
  components: { Header, Sidebar },
  setup() {
    const menuList = [
      {
        icon: 'inbox',
        label: 'Inbox',
        separator: true
      },
      {
        icon: 'send',
        label: 'Outbox',
        separator: false
      },
      {
        icon: 'delete',
        label: 'Trash',
        separator: false
      },
      {
        icon: 'error',
        label: 'Spam',
        separator: true
      },
      {
        icon: 'settings',
        label: 'Settings',
        separator: false
      },
      {
        icon: 'feedback',
        label: 'Send Feedback',
        separator: false
      },
      {
        icon: 'help',
        iconColor: 'primary',
        label: 'Help',
        separator: false
      }
    ];
    return {
      drawer: ref(false),
      menuList,
      Header,
      Sidebar
    };
  }
});
</script>
