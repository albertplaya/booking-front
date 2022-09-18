<template>
  <q-page padding class="flex-1 bg-gray-50">
    <div class="q-pa-md flex justify-center">
      <ErrorNotification :error="error" />
      <div
        v-if="partner"
        class="q-pa-md pt-4 border border-solid rounded-md border-gray-200"
        style="width: 400px"
      >
        <q-form class="q-gutter-md pt-4">
          <q-input
            filled
            v-model="partner.email"
            label="Email"
            lazy-rules
            disable
            readonly
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="partner.given_name"
            label="Name"
            lazy-rules
            autogrow
            disable
            readonly
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="partner.family_name"
            label="Surname"
            lazy-rules
            autogrow
            disable
            readonly
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="partner.locale"
            label="Language"
            lazy-rules
            autogrow
            disable
            readonly
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="partner.subscription_plan"
            label="Subscription plan"
            lazy-rules
            autogrow
            disable
            readonly
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="partner.subdomain"
            label="Landing subdomain"
            lazy-rules
            autogrow
            disable
            readonly
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
        </q-form>
      </div>
      <!--
      <div class="pt-4" style="max-width: 400px">
        <q-btn
          @click=""
          no-caps
          style="color: typography-primary-inverted"
          class="float-right"
          label="Save"
          type="submit"
          color="teal"
        />
      </div>-->
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import BackButton from "@/components/button/Back.vue";
import ErrorNotification from "@/components/notification/ErrorNotification.vue";
import router from "@/router";
import { usePartner } from "@/use/Partner";
import { Partner } from "@/types/Partner";
import { useAuth } from "@/use/Authentication";

const { get } = usePartner();
const { getPartner } = useAuth();

const partner = ref<Partner>();
const error = ref<any>("");

onMounted(async () => {
  const partner: Partner = getPartner();
  getPartnerFromApi(partner.partner_id);
});

const getPartnerFromApi = async (partnerId: string) => {
  get(partnerId)
    .then((result) => (partner.value = result))
    .catch(() => {
      return router.push({ name: "not-found" });
    });
};
</script>
