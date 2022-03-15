<template>
  <div v-if="showLayout">
    <q-layout view="hHh LpR fFf">
      <Header />
      <FooterMobile />
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
  <div v-else>
    <q-layout view="hHh lpR fFf">
      <q-page-container class="a flex justify-center bg-gray-200">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/layout/Header.vue";
import FooterMobile from "@/components/layout/FooterMobile.vue";
import { useAuth } from "@/use/Authentication";
export default defineComponent({
  components: { Header, FooterMobile },
  setup() {
    const urlFirstPath = window.location.pathname.split("/")[1];
    const showLayout = urlFirstPath !== "booking" && urlFirstPath !== "partner";
    const { authUser } = useAuth();
    authUser();
    return {
      Header,
      showLayout,
    };
  },
});
</script>
