const state = {
  currentPanel: "master",
  panelStack: [],
  dataSetName: "",
  dsnLevel: "",
  dsMember: "",
  cdsName: ""
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
  },
  SET_DSN(state, v) {
    state.dataSetName = v;
  },
  SET_DSN_LEVEL(state, v) {
    state.dsnLevel = v;
  },
  SET_DS_MEMBER(state, v) {
    state.dsMember = v;
  },
  SET_CDS_NAME(state, v) {
    state.cdsName = v;
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
