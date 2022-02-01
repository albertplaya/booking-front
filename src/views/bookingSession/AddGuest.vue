<template>
  <q-page padding class="flex justify-center items-center">
    <div>
      <div class="pb-4 flex row-auto justify-between" style="min-width: 320px">
        <h3 class="text-2xl">Add guest</h3>
        <BackButton />
      </div>
      <div
        class="q-pa-md m-2 border border-solid rounded-md border-gray-200"
        style="max-width: 400px"
      >
        <q-form class="q-gutter-md">
          <q-input
            v-model="name"
            filled
            label="Name"
            lazy-rules
            autogrow
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something'
            ]"
          />

          <q-input
            v-model="lastName"
            filled
            label="Last name"
            lazy-rules
            autogrow
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something'
            ]"
          />
          <q-input
            v-model="email"
            filled
            lazy-rules
            autogrow
            label="Email"
            type="email"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something'
            ]"
          />
          <q-input
            v-model="phone"
            filled
            lazy-rules
            autogrow
            label="Phone"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something'
            ]"
          />
        </q-form>
      </div>
      <div style="max-width: 400px">
        <q-btn
          class="float-right"
          label="Save"
          type="submit"
          color="primary"
          @click="addGuestSession"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useBookingSession } from '@/use/BookingSession';
import BackButton from '@/components/button/Back.vue';
import router from '@/router';

export default defineComponent({
  components: { BackButton },
  props: {
    eventId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    onMounted(() => {
      initBookingSession(props.eventId);
    });

    const { initBookingSession, addGuest } = useBookingSession();

    const name = ref<string>('');
    const lastName = ref<string>('');
    const email = ref<string>('');
    const phone = ref<string>('');
    const addGuestSession = () => {
      addGuest(props.eventId, {
        first_name: name.value,
        last_name: lastName.value,
        email: email.value,
        phone: phone.value
      });
      router.push({
        name: 'booking-thankyou',
        params: { eventId: props.eventId }
      });
    };

    return {
      name,
      lastName,
      email,
      phone,
      addGuestSession
    };
  }
});
</script>
