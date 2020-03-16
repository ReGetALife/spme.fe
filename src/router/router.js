import Vue from "vue";
import store from "@/store";
import Router from "vue-router";
import home from "./routes/home";
import login from "./routes/login";
import playground from "./routes/playground";
import administration from "./routes/administration";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    home,
    login,
    playground,
    administration,
    {
      path: "*",
      component: () => import("@/components/404")
    }
  ]
});

// Redirect to login page while not login
router.beforeEach((to, from, next) => {
  if (store.getters["user/isLogin"]) {
    if (to.name === "login") {
      next("/");
    }
  } else {
    if (to.name !== "login") {
      next("/login");
    }
  }
  next();
});

export default router;
