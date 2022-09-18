<template>
  <q-page class="flex-1 bg-gray-50" padding>
    <div>
      <div class="flex justify-between">
        <h3 class="text-2xl ml-2">Passes</h3>
        <div class="flex">
          <q-btn
            class="mr-2"
            no-caps
            :to="{ name: 'pass-add' }"
            label="Add Pass"
            type="submit"
            color="teal"
            icon="add"
            style="color: typography-primary-inverted"
          />
          <q-btn
            no-caps
            :to="{ name: 'pass-assign' }"
            label="Assing Pass"
            type="submit"
            color="teal"
            icon="arrow_forward"
            style="color: typography-primary-inverted"
          />
        </div>
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
          <PassCard :pass="pass" @click="updatePass(pass.pass_id)" />
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
import PassCard from "@/components/pass/PassCard.vue";
import router from "@/router";

onMounted(() => {
  listPassAction();
});

const { getPartner } = useAuth();
const { listPass } = usePass();

const passes = ref<Pass[]>([]);
const partner = ref<Partner>();

const listPassAction = async () => {
  partner.value = getPartner();
  listPass(partner.value.partner_id)
    .then((result) => (passes.value = result))
    .catch((e) => {
      return router.push({ name: "not-found" });
    });
};

const updatePass = (passId: string) => {
  router.push({ name: "pass-update", params: { passId } });
};
</script>
