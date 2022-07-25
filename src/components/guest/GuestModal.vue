<template>
  <input type="checkbox" id="guest-modal" class="modal-toggle" />
  <label for="guest-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
      <div class="flex justify-between">
        <h3 class="text-2xl ml-2">Update guest</h3>
        <q-separator />
        <label for="guest-modal"
          ><q-icon class="cursor-pointer" size="2em" name="close"
        /></label>
      </div>
      <div class="bg-whitept-5">
        <div v-if="guest" class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <div class="mt-2">
            <q-form>
              <q-input
                filled
                v-model="guest.first_name"
                label="First Name"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
              <q-input
                filled
                v-model="guest.last_name"
                label="Last Name"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
              <q-input
                filled
                v-model="guest.email"
                label="Email"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
              <q-input
                filled
                v-model="guest.phone"
                label="Phone"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </q-form>
          </div>
          <div class="flex flex-row-reverse">
            <div class="modal-action">
              <label
                class="btn btn-secondary cursor-pointer text-white"
                @click="updateGuestAndCloseModal"
                >Save</label
              >
            </div>
          </div>
        </div>
      </div>
    </label>
  </label>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { Guest } from "@/types/Guest";
import { useGuest } from "@/use/Guest";
import router from "@/router";

const props = defineProps({
  guest: {
    type: Object as PropType<Guest>,
    required: true,
  },
});

const { updateGuest } = useGuest();

const updateGuestAndCloseModal = async () => {
  if (!props.guest) {
    return;
  }
  updateGuest(props.guest)
    .then(async () => {
      closeModal();
    })
    .catch((e) => {
      return router.push({ name: "not-found" });
    });
};

const closeModal = async () => {
  document.getElementById("guest-modal").checked = false;
};
</script>
