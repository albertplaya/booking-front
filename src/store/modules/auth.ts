import { User } from "@/types/User";

interface UserState {
  user: User | null;
}

const state: UserState = {
  user: null,
};

const getters = {
  user(state: UserState): User | null {
    return state.user;
  },
};

const actions = {};

const mutations = {
  set(state: UserState, user: User) {
    state.user = user;
  },
  remove(state: any, user: User) {
    state.user = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
