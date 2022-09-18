<template>
  <div
    class="visible-custom"
    v-if="currentRoute !== 'register' && currentRoute !== 'login'"
  >
    <div class="flex justify-center">
      <a class="p-6" href="#">
        <img class="h-8 sm:w-auto md:w-16 lg:w-36" src="/logo.svg" alt="" />
      </a>
    </div>
    <ul class="menu shadow bg-base-100 md:w-max lg:w-56 p-2 rounded-box mx-4">
      <li class="menu-title md:hidden lg:flex">
        <span>Categories</span>
      </li>
      <router-link v-for="section in menu" :to="{ name: section.route_name }">
        <li>
          <div>
            <q-icon
              class="w-auto"
              size="25px"
              :name="section.icon_name"
              :color="currentRoute == section.route_name ? 'teal' : 'black'"
            />
            <span
              v-if="currentRoute == section.route_name"
              class="text-selected"
            >
              {{ section.title }}
            </span>
            <span v-else class="text-lg font-medium md:hidden lg:flex">
              {{ section.title }}
            </span>
          </div>
        </li>
      </router-link>
    </ul>
  </div>
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

const menu = [
  {
    title: "Activities",
    route_name: "activity-list",
    icon_name: "o_insert_invitation",
  },
  {
    title: "Bookings",
    route_name: "booking-list",
    icon_name: "o_confirmation_number",
  },
  {
    title: "Guests",
    route_name: "guest-list",
    icon_name: "o_people",
  },
  {
    title: "Wallet",
    route_name: "wallet",
    icon_name: "o_account_balance_wallet",
  },
  {
    title: "Account",
    route_name: "account",
    icon_name: "o_account_circle",
  },
];
</script>

<style scoped lang="scss">
.text-selected {
  @apply text-lg font-medium md:hidden lg:flex;
  color: $teal;
}

.visible-custom {
  display: none;
}
@media only screen and (min-width: 766px) {
  .visible-custom {
    display: block !important;
  }
}
</style>
