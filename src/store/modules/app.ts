interface AppState {
  sidebar: boolean;
}

const state: AppState = {
  sidebar: false
};

const getters = {};

const actions = {
  toggleSideBar({ commit }) {
    commit('toggleSideBar');
  }
};

const mutations = {
  toggleSideBar(state: AppState) {
    state.sidebar = !state.sidebar;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
