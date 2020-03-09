import Axios from "axios";
const SESSION_USER = "zosmf_user";
const USER_ROLE = "user_role";

let username = "";
let role = "";
try {
  username = JSON.parse(sessionStorage.getItem(SESSION_USER));
} catch (error) {
  // ignore error
}
try {
  role = JSON.parse(sessionStorage.getItem(USER_ROLE));
} catch (e) {
  //ignore
}

const state = {
  username,
  role
};

const getters = {
  isLogin(state) {
    return !!state.username;
  }
};

const mutations = {
  SET_USER(state, uid) {
    sessionStorage.setItem(SESSION_USER, JSON.stringify(uid));
    try {
      state.username = uid.toUpperCase();
    } catch (e) {
      //ignore
    }
  },
  SET_ROLE(state, role) {
    sessionStorage.setItem(USER_ROLE, JSON.stringify(role));
    state.role = role.toUpperCase();
  }
};

const actions = {
  login({ commit }, loginState) {
    commit("SET_USER", loginState.uid);
    commit("SET_ROLE", loginState.role);
  },

  logout({ commit }) {
    Axios.delete("/api/logoff").then(() => {
      commit("SET_USER", "");
      commit("SET_ROLE", "");
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
