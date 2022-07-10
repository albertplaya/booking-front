<template>
  <q-page padding class="flex justify-center bg-gray-50">
    <div class="q-pa-md flex-grow" style="max-width: 400px">
      <div class="pb-4 flex row-auto justify-between">
        <h3 class="text-2xl ml-2">Assign pass</h3>
        <BackButton />
      </div>
      <ErrorNotification :error="error" />
      <div
        class="q-pa-md pt-4 border border-solid bg-white rounded-md border-gray-200"
        style="max-width: 400px"
      >
        <q-select
          filled
          v-model="selectedGuest"
          use-input
          input-debounce="0"
          label="Select guest"
          :options="options"
          @filter="filterByGuestName"
          behavior="menu"
          map-options
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <div v-if="!passes.length" class="flex">
        <div
          class="flex justify-center flex-grow text-2xl bg-gray-50 border-2 rounded-md mt-4 p-4"
        >
          No pass yet!
        </div>
      </div>
      <div v-else class="flex justify-around mt-4">
        <div v-for="pass in passes" :key="pass.pass_id">
          <PassCard
            :pass="pass"
            :selected="selectedPass == pass"
            @click="selectPass(pass)"
          />
        </div>
      </div>

      <div class="pt-4" style="max-width: 400px">
        <q-btn
          @click="saveGuestPass"
          no-caps
          style="color: typography-primary-inverted"
          class="float-right"
          label="Save"
          type="submit"
          color="teal"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { usePass } from "@/use/Pass";
import { useGuest } from "@/use/Guest";
import BackButton from "@/components/button/Back.vue";
import ErrorNotification from "@/components/notification/Error.vue";
import router from "@/router";
import { useAuth } from "@/use/Authentication";
import { useGuestPass } from "@/use/GuestPass";
import { Partner } from "@/types/Partner";
import { Guest } from "@/types/Guest";
import { Pass } from "@/types/Pass";
import PassCard from "@/components/pass/PassCard.vue";

onMounted(() => {
  getGuests();
  listPassAction();
});

const { listGuest } = useGuest();
const { listPass } = usePass();
const { getPartner } = useAuth();
const { createGuestPass } = useGuestPass();

const partner: Partner = getPartner();
const selectedGuest = ref<{ label: string; value: Guest }>();
const stringOptions = ref<{ label: string; value: Guest }[]>([]);
const options = ref<{ label: string; value: Guest }[]>([]);
const error = ref<any>("");
const passes = ref<Pass[]>([]);
const selectedPass = ref<Pass>();

const getGuests = async () => {
  listGuest(partner.partner_id as string).then((result) => {
    stringOptions.value = result.map((guest: Guest) => {
      return { value: guest, label: guest.first_name + " " + guest.last_name };
    });
  });
};

const filterByGuestName = (value: string, update: any) => {
  if (value === "") {
    update(() => {
      options.value = stringOptions.value;
    });
    return;
  }

  update(() => {
    const needle = value.toLowerCase();
    options.value = stringOptions.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

const listPassAction = async () => {
  listPass(partner.partner_id)
    .then((result) => (passes.value = result))
    .catch((e) => {
      return router.push({ name: "not-found" });
    });
};

const selectPass = (pass: Pass) => {
  selectedPass.value = pass;
};

const saveGuestPass = () => {
  if (!selectedGuest.value) {
    error.value = "No guest selected";
    return;
  }

  if (!selectedPass.value) {
    error.value = "No pass selected";
    return;
  }

  createGuestPass(selectedPass.value, selectedGuest.value.value)
    .then(() => {
      router.push({ name: "pass-list" });
    })
    .catch((e) => {
      error.value = e;
    });
};
</script>
