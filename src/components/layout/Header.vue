<template>
  <q-header
    class="header flex justify-center"
    v-if="currentRoute !== 'register' && currentRoute !== 'login'"
  >
    <q-toolbar class="toolbar">
      <div
        class="flex justify-between items-center py-4 md:justify-start md:space-x-10"
      >
        <div class="flex justify-start lg:flex-1 lg:ml-12">
          <a href="#">
            <span class="sr-only">Workflow</span>
            <img class="h-8 w-auto" src="/logo.svg" alt="" />
          </a>
        </div>
      </div>
      <div>
        <div v-if="userAuth" class="flex flex-row visible-custom">
          <q-btn
            no-caps
            flat
            :color="currentRoute == 'activity-list' ? 'teal' : 'black'"
            icon="insert_invitation"
            label="Activities"
            :to="{ name: 'activity-list' }"
          />
          <q-btn
            no-caps
            flat
            :color="currentRoute == 'booking-list' ? 'teal' : 'black'"
            icon="confirmation_number"
            label="Bookings"
            :to="{ name: 'booking-list' }"
          />
          <q-btn
            no-caps
            flat
            :color="currentRoute == 'guest-list' ? 'teal' : 'black'"
            icon="people"
            label="Guests"
            :to="{ name: 'guest-list' }"
          />
          <q-btn
            no-caps
            flat
            :color="currentRoute == 'account' ? 'teal' : 'black'"
            icon="account_circle"
            label="Account"
            :to="{ name: 'account' }"
          />
          <q-btn
            no-caps
            flat
            :color="currentRoute == 'wallet' ? 'teal' : 'black'"
            icon="account_balance_wallet"
            label="Wallet"
            :to="{ name: 'wallet' }"
          />
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { watch, ref, computed, ComputedRef, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const route = useRoute();
const currentRoute = ref<string>("");
const userAuth = ref<boolean>(false);

onMounted(() => {
  onAuthStateChanged(getAuth(), async (user) => {
    if (user) userAuth.value = true;
  });
});

watch(
  () => route.name,
  () => {
    currentRoute.value = route.name as string;
  }
);
</script>

<style scoped>
.header {
  @apply bg-gray-50 text-black z-40;
}

.toolbar {
  @apply flex justify-between;
  max-width: 1200px;
  max-height: 50px;
}
.visible-custom {
  display: none;
}
@media only screen and (min-width: 640px) {
  .visible-custom {
    display: block !important;
  }
}
</style>
