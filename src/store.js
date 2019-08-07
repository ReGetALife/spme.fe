import Vue from "vue";
import Vuex from "vuex";

import user from "./stores/user";
import report from "./stores/report";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    user,
    report
  },
  strict: debug
});
