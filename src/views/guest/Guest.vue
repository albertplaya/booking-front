<template>
  <q-page class="flex justify-center bg-gray-50" padding>
    <div style="width: 895px">
      <div class="flex justify-between">
        <h3 class="text-2xl ml-2">Guest</h3>
        <q-separator />
        <BackButton />
      </div>
      <div class="flex flex-col mt-4">
        <div v-if="guest">
          <div class="text-sm text-center">
            {{ guest.first_name }}
            {{ guest.last_name }}
          </div>
          <div class="text-sm text-center">
            {{ guest.email }}
          </div>
          <div class="text-sm text-center">
            {{ guest.phone }}
          </div>
        </div>
      </div>
      <div class="text-lg font-bold">Passes</div>
      <div v-if="guestPasses && !guestPasses.length" class="flex">
        <div
          class="flex justify-center flex-grow text-2xl bg-gray-50 border-2 rounded-md mt-4 p-4"
        >
          No passes assigned
        </div>
      </div>
      <div v-else-if="guestPasses" class="flex flex-col mt-4">
        <div class="grid grid-cols-4 gap-4 center m-1 p-1">
          <div class="text-md font-bold flex justify-center">Title</div>
          <div class="text-md font-bold flex justify-center">Quantity</div>
          <div class="text-md font-bold flex justify-center">Price</div>
          <div class="text-md font-bold flex justify-center">Status</div>
        </div>

        <div
          class="mb-2 bg-white rounded-md tems-center border-gray-200 border-2"
          flat
          bordered
        >
          <div v-for="guestPass in guestPasses" :key="guestPass.guest_pass_id">
            <div
              class="booking grid grid-cols-4 gap-4 p-2 bg-white rounded-md items-center"
            >
              <div class="text-sm text-center">
                {{ guestPass.title }}
              </div>
              <div class="flex justify-center">
                <div
                  class="flex justify-center diagonal-fractions text-3xl text-teal px-2 py-1 rounded-md booking-number"
                >
                  {{ guestPass.current_quantity }}/{{ guestPass.quantity }}
                </div>
              </div>
              <div class="text-sm text-center">
                {{ guestPass.price }}
              </div>
              <div class="text-lg flex justify-center">
                <div
                  class="text-teal px-2 py-1 rounded-md"
                  style="background: #e8f2ed"
                >
                  {{ guestPass.status }}
                </div>
              </div>
            </div>
            <div
              v-if="guestPasses[guestPasses.length - 1] !== guestPass"
              q-space
              class="border"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useGuest } from "@/use/Guest";
import { useGuestPass } from "@/use/GuestPass";
import { Guest } from "@/types/Guest";
import { Partner } from "@/types/Partner";
import { GuestPass } from "@/types/GuestPass";
import { useAuth } from "@/use/Authentication";
import BackButton from "@/components/button/Back.vue";
import router from "@/router";

const props = defineProps({
  guestId: {
    type: String,
    default: "",
  },
});

onMounted(async () => {
  getGuestAction();
  getGuestPassesByGuestAction();
});

const { getPartner } = useAuth();
const { getGuest } = useGuest();
const { getGuestPassesByGuest } = useGuestPass();

const guest = ref<Guest>();
const partner = ref<Partner>();
const guestPasses = ref<GuestPass[]>();

const getGuestAction = async () => {
  partner.value = getPartner();
  getGuest(props.guestId)
    .then((result) => (guest.value = result))
    .catch((e) => {
      return router.push({ name: "not-found" });
    });
};

const getGuestPassesByGuestAction = async () => {
  getGuestPassesByGuest(props.guestId).then(
    (result) => (guestPasses.value = result)
  );
};
</script>

<style scoped lang="scss">
.grid-title {
  @apply text-lg font-bold flex justify-center;
}
.guest-list {
  cursor: pointer;
}
.guest-list:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(249, 250, 251, var(--tw-bg-opacity)) !important;
}
</style>
