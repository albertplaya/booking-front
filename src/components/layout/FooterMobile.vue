<template>
  <div
    class="visible sm:invisible"
    v-if="currentRoute !== 'register' && currentRoute !== 'login'"
  >
    <q-footer
      elevated
      class="bg-gray-50 text-black flex justify-around"
      style="height: 50px"
      v-if="userAuth"
    >
      <q-btn
        :color="currentRoute == 'activity-list' ? 'teal' : 'black'"
        flat
        round
        icon="insert_invitation"
        style="font-size: 1rem"
        :to="{ name: 'activity-list' }"
      />
      <q-btn
        :color="currentRoute == 'booking-list' ? 'teal' : 'black'"
        flat
        round
        icon="confirmation_number"
        style="font-size: 1rem"
        :to="{ name: 'booking-list' }"
      />
      <q-btn
        :color="currentRoute == 'guest-list' ? 'teal' : 'black'"
        flat
        round
        icon="people"
        style="font-size: 1rem"
        :to="{ name: 'guest-list' }"
      />
      <q-btn
        :color="currentRoute == 'wallet' ? 'teal' : 'black'"
        flat
        round
        icon="account_balance_wallet"
        style="font-size: 1rem"
        :to="{ name: 'wallet' }"
      />
      <q-btn
        :color="currentRoute == 'account' ? 'teal' : 'black'"
        flat
        round
        style="font-size: 1rem"
        :to="{ name: 'account' }"
      >
        <q-avatar size="34px">
          <img :src="partner.picture" />
        </q-avatar>
      </q-btn>
    </q-footer>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "@/use/Authentication";
import { Partner } from "@/types/Partner";

const { getPartner } = useAuth();

const route = useRoute();
const partner: Partner = getPartner();
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
.visible-custom {
  display: none;
}
@media only screen and (min-width: 640px) {
  .visible-custom {
    display: block !important;
  }
}
</style>
