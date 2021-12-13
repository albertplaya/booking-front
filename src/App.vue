<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Header</q-toolbar-title>
        </q-toolbar>

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {},
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
      menuList
    };
  }
});
</script>
