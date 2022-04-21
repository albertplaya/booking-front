<template>
  <div class="visible sm:invisible">
    <q-footer
      elevated
      class="bg-gray-50 text-black flex justify-around"
      style="height: 50px"
      v-if="partner"
    >
      <q-btn
        :color="currentRoute == 'activity-list' ? 'teal' : 'black'"
        flat
        round
        icon="insert_invitation"
        style="font-size: 1rem"
        :to="{ name: 'activity-list' }"
      />
      <!--
      <q-btn
        flat
        round
        icon="confirmation_number_outline"
        style="font-size: 1.2rem"
      />
      -->
      <q-btn
        :color="currentRoute == 'account' ? 'teal' : 'black'"
        flat
        round
        icon="account_circle"
        style="font-size: 1rem"
        :to="{ name: 'account' }"
      />
    </q-footer>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import { Partner } from "@/types/Partner";
import { useAuth } from "@/use/Authentication";

const route = useRoute();
const { getPartner } = useAuth();

const partner: Partner = getPartner();

const currentRoute = ref<string>("");
watch(
  () => route.name,
  () => {
    currentRoute.value = route.name as string;
  }
);
</script>

<style scoped>
.visible-custom {
  visibility: hidden;
}
@media only screen and (min-width: 640px) {
  .visible-custom {
    visibility: visible !important;
  }
}
</style>
