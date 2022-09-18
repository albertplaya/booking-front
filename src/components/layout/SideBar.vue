<template>
  <div
    class="visible-custom"
    v-if="currentRoute !== 'register' && currentRoute !== 'login'"
  >
    <div class="flex justify-center">
      <a class="p-6" href="#">
        <span class="sr-only">Workflow</span>
        <img class="h-8 w-auto" src="/logo.svg" alt="" />
      </a>
    </div>
    <ul class="menu shadow bg-base-100 md:w-20 lg:w-56 p-2 rounded-box mx-4">
      <li class="menu-title md:hidden lg:flex">
        <span>Categories</span>
      </li>
      <router-link :to="{ name: 'activity-list' }">
        <li>
          <div>
            <q-icon
              size="25px"
              name="o_insert_invitation"
              :color="currentRoute == 'activity-list' ? 'teal' : 'black'"
            />
            <span class="text-lg font-medium md:hidden lg:flex">
              Activities
            </span>
          </div>
        </li>
      </router-link>
      <router-link :to="{ name: 'booking-list' }">
        <li>
          <div>
            <q-icon
              size="25px"
              name="o_confirmation_number"
              :color="currentRoute == 'booking-list' ? 'teal' : 'black'"
            />
            <span class="text-lg font-medium md:hidden lg:flex">
              Bookings
            </span>
          </div>
        </li>
      </router-link>
      <router-link :to="{ name: 'guest-list' }">
        <li>
          <div>
            <q-icon
              size="25px"
              name="o_people"
              :color="currentRoute == 'guest-list' ? 'teal' : 'black'"
            />
            <span class="text-lg font-medium md:hidden lg:flex"> Guests</span>
          </div>
        </li>
      </router-link>
      <router-link :to="{ name: 'wallet' }">
        <li>
          <div>
            <q-icon
              size="25px"
              name="o_account_balance_wallet"
              :color="currentRoute == 'wallet' ? 'teal' : 'black'"
            />
            <span class="text-lg font-medium md:hidden lg:flex"> Wallet</span>
          </div>
        </li>
      </router-link>
      <router-link :to="{ name: 'account' }">
        <li>
          <div>
            <q-icon
              size="25px"
              name="o_account_circle"
              :color="currentRoute == 'account' ? 'teal' : 'black'"
            />
            <span class="text-lg font-medium md:hidden lg:flex"> Account</span>
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
