<template>
  <div style="max-width: 895px">
    <PartnerHeader v-if="partner" :partner="partner" />
    <q-page class="flex justify-center bg-gray-50" padding>
      <div style="max-width: 895px">
        <div v-if="activities.length" class="flex row-auto justify-around mt-4">
          <ActivityCard v-for="activity in activities" :activity="activity" />
        </div>
      </div>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";
import { useActivity } from "@/use/Activity";
import { usePartner } from "@/use/Partner";
import { Activity } from "@/types/Activity";
import { Partner } from "@/types/Partner";
import PartnerHeader from "@/components/layout/PartnerHeader.vue";
import ActivityCard from "@/components/partnerLanding/ActivityCard.vue";
import router from "@/router";

const props = defineProps({
  subdomain: {
    type: String,
    required: true,
  },
});

onMounted(async () => {
  getPartner().then((partnerResult: Partner) => {
    partner.value = partnerResult;
    listActivities(partnerResult);
  });
});

const { list } = useActivity();
const { getBySubdomain } = usePartner();
const partner = ref<Partner>();
const activities = ref<Activity[]>([]);

const getPartner = async (): Promise<Partner> => {
  return getBySubdomain(props.subdomain);
};

const listActivities = async (partner: Partner) => {
  list(partner.partner_id)
    .then((result) => (activities.value = result))
    .catch(() => {
      return router.push({ name: "not-found" });
    });
};
</script>
