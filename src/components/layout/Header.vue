<template>
  <q-header class="bg-gray-50 text-black">
    <q-toolbar class="flex justify-between">
      <div class="text-2xl">Header</div>
      <div>
        <div v-if="user" class="flex flex-row visible-custom">
          <q-btn
            no-caps
            flat
            :color="currentRoute == 'activity-list' ? 'teal' : 'black'"
            icon="insert_invitation"
            label="Activities"
            :to="{ name: 'activity-list' }"
          />
          <!--
          <q-btn
            no-caps
            flat
            icon="confirmation_number_outline"
            label="Bookings"
          />
          -->
          <q-btn no-caps flat color="" icon="account_circle" label="Account" />
        </div>
        <q-btn v-else @click="login" color="primary" label="login" />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { User } from "@/types/User";
import { useAuth } from "@/use/Authentication";
import {
  defineComponent,
  inject,
  watch,
  ref,
  computed,
  ComputedRef,
} from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "HeaderApp",
  setup() {
    const auth: any = inject("auth");
    const route = useRoute();
    const currentRoute = ref<string>("");
    const { getUser } = useAuth();

    const user: ComputedRef<User> = computed(() => getUser());

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

    return { login, logout, auth, user, currentRoute };
  },
});
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
