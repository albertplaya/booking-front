<template>
  <input type="checkbox" id="guest-pass-modal" class="modal-toggle" />
  <label for="guest-pass-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
      <div class="flex justify-between">
        <h3 class="text-2xl ml-2">Update pass</h3>
        <q-separator />
        <label for="guest-pass-modal"
          ><q-icon class="cursor-pointer" size="2em" name="close"
        /></label>
      </div>
      <div class="bg-whitept-5">
        <div
          v-if="guestPass"
          class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
        >
          <div class="mt-2">
            <q-form>
              <q-input
                filled
                v-model="guestPass.title"
                label="Title"
                lazy-rules
                disable
                readonly
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
              <q-input
                filled
                v-model="guestPass.price"
                label="Price"
                lazy-rules
                disable
                readonly
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
              <q-select
                class="mb-4"
                filled
                v-model="guestPass.status"
                :options="guestPassStatus"
                label="Status"
              />
            </q-form>
          </div>
          <div class="flex flex-row-reverse">
            <div class="modal-action">
              <label
                class="btn btn-secondary cursor-pointer text-white"
                @click="updateGuestPassAndCloseModal"
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
import { GuestPass } from "@/types/GuestPass";
import { useGuestPass } from "@/use/GuestPass";
import router from "@/router";

const props = defineProps({
  guestPass: {
    type: Object as PropType<GuestPass>,
    required: true,
  },
});

const { updateGuestPassStatus } = useGuestPass();
const guestPassStatus = ["booked", "paid"];

const updateGuestPassAndCloseModal = async () => {
  if (!props.guestPass) {
    return;
  }
  updateGuestPassStatus(props.guestPass)
    .then(async () => {
      closeModal();
    })
    .catch(() => {
      return router.push({ name: "not-found" });
    });
};

const closeModal = async () => {
  document.getElementById("guest-pass-modal").checked = false;
};
</script>
