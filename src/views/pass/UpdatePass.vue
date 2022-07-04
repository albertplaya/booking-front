<template>
  <q-page padding class="flex justify-center bg-gray-50">
    <div class="q-pa-md flex-grow" style="max-width: 400px">
      <div class="pb-4 flex row-auto justify-between">
        <h3 class="text-2xl ml-2">Add pass</h3>
        <BackButton />
      </div>
      <ErrorNotification :error="error" />
      <div
        class="q-pa-md pt-4 border border-solid rounded-md border-gray-200"
        style="max-width: 400px"
      >
        <q-form v-if="pass" class="q-gutter-md pt-4">
          <q-input
            filled
            v-model="pass.title"
            label="Title"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="pass.description"
            label="Description"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="pass.quantity"
            label="Quantity"
            lazy-rules
            autogrow
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="pass.price"
            label="Price"
            lazy-rules
            autogrow
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          >
            <template v-slot:append>
              <q-icon name="euro" />
            </template>
          </q-input>
        </q-form>
      </div>

      <div class="pt-4 q-gutter-sm" style="max-width: 400px">
        <q-btn
          @click="updatePass"
          no-caps
          style="color: typography-primary-inverted"
          class="float-right"
          label="Save"
          type="submit"
          color="teal"
        />
        <q-btn
          no-caps
          class="float-right"
          label="Delete"
          type="submit"
          color="rhubarb"
          @click="deletePass"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePass } from "@/use/Pass";
import BackButton from "@/components/button/Back.vue";
import ErrorNotification from "@/components/notification/Error.vue";
import { Pass } from "@/types/Pass";
import router from "@/router";
import { useAuth } from "@/use/Authentication";
import { Partner } from "@/types/Partner";

const props = defineProps({
  passId: {
    type: String,
    default: "",
  },
});

const { get, update, remove } = usePass();
const { getPartner } = useAuth();

onMounted(() => {
  getPass(props.passId);
});

const pass = ref<Pass>();
const error = ref<any>("");

const getPass = async (passId: string) => {
  get(passId)
    .then((result: Pass) => {
      pass.value = {
        ...result,
        price: result.price / 100,
      };
    })
    .catch(() => {
      return router.push({ name: "not-found" });
    });
};

const updatePass = () => {
  const partner: Partner = getPartner();
  update(pass.value)
    .then(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push({ name: "pass-list" });
    })
    .catch((err) => {
      error.value = err;
    });
};

const deletePass = () => {
  remove(pass.value.pass_id)
    .then(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push({ name: "pass-list" });
    })
    .catch((err) => {
      error.value = err;
    });
};
</script>

<style lang="scss" scoped>
.bg-rhubarb {
  background: $rhubarb !important;
}
</style>
