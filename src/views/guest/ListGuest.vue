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
        <div
          class="grid grid-cols-3 gap-4 m-2 bg-white rounded-md p-2 items-center border-gray-200 border-2"
          flat
          bordered
          v-for="guest in guests"
          :key="guest.guests_id"
        >
          <div class="text-sm">
            {{ guest.first_name }}
            {{ guest.last_name }}
          </div>
          <div class="text-sm">
            {{ guest.email }}
          </div>
          <div class="text-sm">
            {{ guest.phone }}
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
  listGuest();
});

const { getPartner } = useAuth();
const { list } = useGuest();

const guests = ref<Guest[]>([]);
const partner = ref<Partner>();

const listGuest = async () => {
  partner.value = getPartner();
  list(partner.value.partner_id)
    .then((result) => (guests.value = result))
    .catch((e) => {
      return router.push({ name: "not-found" });
    });
};
</script>
