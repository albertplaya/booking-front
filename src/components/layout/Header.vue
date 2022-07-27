<template>
  <q-header class="header">
    <q-toolbar class="toolbar">
      <div
        class="flex justify-between items-center py-4 md:justify-start md:space-x-10"
      >
        <div class="flex justify-start lg:flex-1 lg:ml-12">
          <a href="#">
            <span class="sr-only">Workflow</span>
            <img class="h-12 w-auto" src="/logo.svg" alt="" />
          </a>
        </div>
      </div>
      <div>
        <div v-if="partner" class="flex flex-row visible-custom">
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
        <q-btn v-else @click="login" color="primary" label="login" />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { Partner } from "@/types/Partner";
import { useAuth } from "@/use/Authentication";
import { inject, watch, ref, computed, ComputedRef } from "vue";
import { useRoute } from "vue-router";

const auth: any = inject("auth");
const route = useRoute();
const currentRoute = ref<string>("");
const { getPartner } = useAuth();

const partner: ComputedRef<Partner> = computed(() => getPartner());

const login = () => {
  auth.loginWithPopup({
    redirect_uri: window.location.origin,
  });
};
const logout = () => {
  auth.logout({
    returnTo: window.location.origin,
  });
};

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
