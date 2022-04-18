import { Partner } from "@/types/Partner";

interface PartnerState {
  partner: Partner | null;
}

const state: PartnerState = {
  partner: null,
};

const getters = {
  partner(state: PartnerState): Partner | null {
    return state.partner;
  },
};

const actions = {};

const mutations = {
  set(state: PartnerState, partner: Partner) {
    state.partner = partner;
  },
  remove(state: any, partner: Partner) {
    state.partner = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
