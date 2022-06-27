<template>
  <q-page class="flex justify-center bg-gray-50" padding>
    <div style="width: 895px">
      <div class="flex justify-between">
        <h3 class="text-2xl ml-2">Ticket pass</h3>

        <q-btn
          no-caps
          :to="{ name: 'pass-add' }"
          label="Add Pass"
          type="submit"
          color="teal"
          icon="add"
          style="color: typography-primary-inverted"
        />
      </div>
      <div v-if="!pass.length" class="flex">
        <div
          class="flex justify-center flex-grow text-2xl bg-gray-50 border-2 rounded-md mt-4 p-4"
        >
          No pass yet!
        </div>
      </div>
      <div v-else class="flex flex-col mt-4">
        <div class="grid grid-cols-3 gap-4 center m-1 p-1">
          <div class="text-lg font-bold flex justify-center">Title</div>
          <div class="text-lg font-bold flex justify-center">Quantity</div>
          <div class="text-lg font-bold flex justify-center">Price</div>
        </div>

        <div
          class="mb-2 bg-white rounded-md tems-center border-gray-200 border-2"
          flat
          bordered
        >
          <div v-for="singlePass in pass" :key="singlePass.pass_id">
            <div
              class="booking grid grid-cols-3 gap-4 p-2 bg-white rounded-md items-center"
              @click="updatePass(singlePass.pass_id)"
            >
              <div class="text-sm text-center">
                {{ singlePass.title }}
              </div>
              <div class="text-sm text-center">
                {{ singlePass.quantity }}
              </div>
              <div class="text-sm text-center">
                {{ singlePass.price / 100 }}
              </div>
            </div>
            <div
              v-if="pass[pass.length - 1] !== singlePass"
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
import { usePass } from "@/use/Pass";
import { Pass } from "@/types/Pass";
import { Partner } from "@/types/Partner";
import { useAuth } from "@/use/Authentication";
import router from "@/router";

onMounted(() => {
  listPass();
});

const { getPartner } = useAuth();
const { list } = usePass();

const pass = ref<Pass[]>([]);
const partner = ref<Partner>();

const listPass = async () => {
  partner.value = getPartner();
  list(partner.value.partner_id)
    .then((result) => (pass.value = result))
    .catch((e) => {
      return router.push({ name: "not-found" });
    });
};

const updatePass = (passId: string) => {
  router.push({ name: "pass-update", params: { passId } });
};
</script>

<style scoped lang="scss">
.booking {
  cursor: pointer;
}
.booking:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(249, 250, 251, var(--tw-bg-opacity)) !important;
}
</style>
