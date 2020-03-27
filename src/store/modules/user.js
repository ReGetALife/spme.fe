import Axios from "axios";
import router from "@/router/router";
const SESSION_USER = "zosmf_user";
const USER_ROLE = "user_role";

let username = "";
let role = "";
try {
  username = JSON.parse(localStorage.getItem(SESSION_USER)).toUpperCase();
} catch (error) {
  // ignore error
}
try {
  role = JSON.parse(localStorage.getItem(USER_ROLE)).toUpperCase();
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
    try {
      localStorage.setItem(SESSION_USER, JSON.stringify(uid.toUpperCase()));
      state.username = uid.toUpperCase();
    } catch (e) {
      //ignore
    }
  },
  SET_ROLE(state, role) {
    try {
      localStorage.setItem(USER_ROLE, JSON.stringify(role.toUpperCase()));
      state.role = role.toUpperCase();
    } catch (e) {
      //ignore
    }
  }
};

const actions = {
  login({ commit }, loginState) {
    commit("SET_USER", loginState.uid);
    commit("SET_ROLE", loginState.role);
    router.push("/");
  },

  logout({ commit }) {
    Axios.delete("/api/logoff").finally(() => {
      commit("SET_USER", "");
      commit("SET_ROLE", "");
      router.push("/");
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
