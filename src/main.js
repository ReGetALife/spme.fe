import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store";
import "./registerServiceWorker";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import VueResource from "vue-resource";

Vue.use(Antd);
Vue.use(VueResource);
Vue.config.productionTip = false;

// Register a global custom directive called `v-focus`
Vue.directive("focus", {
  // When the bound element is inserted into the DOM...
  inserted: function(el) {
    if (el.tagName === "input") {
      // Focus the element
      el.focus();
    } else {
      el = el.getElementsByTagName("input")[0];
      el.focus();
    }
  }
});

new Vue({
  router, // vue router
  store, // vuex
  render: h => h(App) // rendered content will be mount on #app
}).$mount("#app");
