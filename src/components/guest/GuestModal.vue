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
      <ErrorNotification class="px-4" :error="error" />
      <div class="bg-whitept-5">
        <div v-if="guest" class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <div class="mt-2">
            <q-form>
              <q-input
                filled
                v-model="guest.first_name"
                label="First Name"
                lazy-rules
                :error="formErrors.get('first_name') != null"
                :error-message="formErrors.get('first_name')?.message"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
              <q-input
                filled
                v-model="guest.last_name"
                label="Last Name"
                lazy-rules
                :error="formErrors.get('last_name') != null"
                :error-message="formErrors.get('last_name')?.message"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
              <q-input
                filled
                v-model="guest.email"
                label="Email"
                lazy-rules
                :error="formErrors.get('email') != null"
                :error-message="formErrors.get('email')?.message"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
              <q-input
                filled
                v-model="guest.phone"
                label="Phone"
                lazy-rules
                :error="formErrors.get('phone') != null"
                :error-message="formErrors.get('phone')?.message"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </q-form>
          </div>
          <div class="flex flex-row-reverse">
            <div class="modal-action mt-0">
              <label>
                <q-btn
                  no-caps
                  style="color: typography-primary-inverted"
                  class="float-right"
                  label="Save"
                  type="submit"
                  color="teal"
                  @click="updateGuestAndCloseModal"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </label>
  </label>
</template>
<script setup lang="ts">
import { PropType, ref } from "vue";
import { Guest } from "@/types/Guest";
import { useGuest } from "@/use/Guest";
import { InputErrorResponse } from "@/types/Form/ErrorResponse";
import ErrorNotification from "@/components/notification/ErrorNotification.vue";

const props = defineProps({
  guest: {
    type: Object as PropType<Guest>,
    required: true,
  },
});

const { updateGuest } = useGuest();
const error = ref<string>("");
const formErrors = ref(new Map<string, InputErrorResponse>());

const updateGuestAndCloseModal = async () => {
  if (!props.guest) {
    return;
  }
  updateGuest(props.guest)
    .then(async () => {
      closeModal();
    })
    .catch((errorResult) => {
      if (typeof errorResult === "string") {
        error.value = errorResult;
      } else {
        formErrors.value = errorResult.errors;
      }
    });
};

const closeModal = async () => {
  document.getElementById("guest-modal").checked = false;
};
</script>
