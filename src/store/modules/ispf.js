const state = {
  currentPanel: "master",
  panelStack: [],
  dataSetName: "",
  dsnLevel: "",
  dsMember: "",
  cdsName: "",
  construct: "",
  editMode: "" // view or edit
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
  },
  SET_CONSTRUCT(state, v) {
    state.construct = v;
  },
  SET_EDIT_MODE(state, v) {
    state.editMode = v;
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
