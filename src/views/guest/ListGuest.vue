<template>
  <q-page class="flex justify-center bg-gray-50" padding>
    <div style="width: 895px">
      <div class="flex justify-between">
        <h3 class="text-2xl ml-2">Guests</h3>
        <q-separator />
        <q-btn
          no-caps
          label="Add Guest"
          type="submit"
          color="teal"
          icon="add"
          :to="{
            name: 'guest-add',
          }"
        />
      </div>
      <AddWhenEmptyList
        v-if="!guests.length"
        label="Add new guest"
        to="guest-add"
      />
      <div v-else class="flex flex-col mt-4">
        <div class="grid grid-cols-3 gap-4 center m-1 p-1">
          <div class="grid-title">Name</div>
          <div class="grid-title">Email</div>
          <div class="grid-title">Phone</div>
        </div>

        <div
          class="mb-2 bg-white rounded-md items-center border-gray-200 border-2"
          flat
          bordered
        >
          <div v-for="guest in guests" :key="guest.guest_id">
            <div
              class="guest-list grid grid-cols-3 gap-4 p-2 bg-white rounded-md items-center"
              @click="goToGuest(guest.guest_id)"
            >
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
            <div
              v-if="guests[guests.length - 1] !== guest"
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
import { Guest } from "@/types/Guest";
import { Partner } from "@/types/Partner";
import { useAuth } from "@/use/Authentication";
import AddWhenEmptyList from "@/components/button/AddWhenEmptyList.vue";
import router from "@/router";

onMounted(() => {
  listGuestAction();
});

const { getPartner } = useAuth();
const { listGuest } = useGuest();

const guests = ref<Guest[]>([]);
const partner = ref<Partner>();

const listGuestAction = async () => {
  partner.value = getPartner();
  listGuest(partner.value.partner_id)
    .then((result) => (guests.value = result))
    .catch((e) => {
      return router.push({ name: "not-found" });
    });
};

const goToGuest = async (guestId: string) => {
  return router.push({
    name: "guest",
    params: { guestId: guestId },
  });
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
