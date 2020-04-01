const state = {
  currentPanel: "master",
  panelStack: []
};
const mutations = {
  SET_PANEL(state, v) {
    state.panelStack.push(state.currentPanel);
    state.currentPanel = v;
  },
  GO_BACK(state) {
    if (state.panelStack.length > 0) {
      state.currentPanel = state.panelStack.pop();
    }
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
