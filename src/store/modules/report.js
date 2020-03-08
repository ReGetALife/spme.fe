const state = {
  score: 0,
  comment: "",
  lab: "",
  url: "",
  uid: ""
};

const mutations = {
  save(state, payload) {
    state.score = payload.score;
    state.comment = payload.comment;
    state.lab = payload.lab;
    state.url = payload.url;
    state.uid = payload.uid;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
