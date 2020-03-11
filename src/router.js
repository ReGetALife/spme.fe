import Vue from "vue";
import Router from "vue-router";

import store from "@/store";

// import layout
import DashBoardLayout from "@/layouts/dashboard.vue";
import AuthLayout from "@/layouts/auth.vue";

// import pages
import teacher from "@/pages/teacher";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      // Redirect base on user role
      // Navigation guards are not applied on the route that redirects, only on its target.
      // So you need to check login state and redirect to login page if necessary.
      redirect: () => {
        switch (store.state.user.role) {
          case "TEACHER":
            return "/teacher/home";
          case "STUDENT":
            return "/dashboard/reports";
          default:
            return "/auth/login";
        }
      }
    },
    {
      path: "/dashboard",
      component: DashBoardLayout,
      children: [
        {
          path: "reports",
          component: () => import("@/pages/dashboard/reports")
        },
        {
          path: "rexx/intro",
          component: () => import("@/pages/dashboard/rexx/intro/index")
        },
        {
          path: "rexx/lab1",
          component: () => import("@/pages/dashboard/rexx/lab1")
        },
        {
          path: "rexx/lab2",
          component: () => import("@/pages/dashboard/rexx/lab2")
        },
        {
          path: "rexx/lab3",
          component: () => import("@/pages/dashboard/rexx/lab3")
        },
        {
          path: "rexx/lab4",
          component: () => import("@/pages/dashboard/rexx/lab4")
        },
        {
          path: "rexx/lab5",
          component: () => import("@/pages/dashboard/rexx/lab5")
        },
        {
          path: "rexx/lab6",
          component: () => import("@/pages/dashboard/rexx/lab6")
        },
        {
          path: "rexx/lab7",
          component: () => import("@/pages/dashboard/rexx/lab7")
        },
        {
          path: "racf/:lab",
          component: () => import("@/pages/dashboard/racf/index")
        },
        {
          path: "dfsms/:lab",
          redirect: "dfsms/:lab/master",
          name: "lab",
          component: () => import("@/pages/dashboard/dfsms/lab"),
          children: [
            {
              path: "master",
              component: () => import("@/components/Console/Panel/MaterPanel")
            },
            {
              path: "is",
              component: () => import("@/components/Console/Panel/IsmfPanel")
            },
            {
              path: "is/:option",
              name: "isoption",
              component: () => import("@/components/Console/Panel/ismf/Main")
            },
            {
              path: "is/0/0",
              component: () =>
                import("@/components/Console/Panel/ismf/Is00profile")
            },
            {
              path: "is/7/2",
              component: () =>
                import("@/components/Console/Panel/ismf/Is72auto")
            },
            {
              path: "p",
              component: () => import("@/components/Console/Panel/PdfPanel")
            },
            {
              path: "data-set-utility",
              name: "p32",
              component: () => import("@/components/Console/Panel/pdf/DsuPanel")
            },
            {
              path: "data-set-list-utility",
              name: "p34",
              component: () =>
                import("@/components/Console/Panel/pdf/DsluPanel")
            },
            {
              path: "allocate-dataset",
              component: () =>
                import("@/components/Console/Panel/pdf/AllocatePanel")
            },
            {
              path: "dslist",
              component: () =>
                import("@/components/Console/Panel/pdf/DslistPanel")
            },
            {
              path: "jcl",
              component: () => import("@/components/Console/Panel/pdf/JCLPanel")
            },
            {
              path: "pdslist",
              component: () =>
                import("@/components/Console/Panel/pdf/PdslistPanel")
            }
          ]
        },
        {
          path: "catalog/intro",
          component: () => import("@/pages/dashboard/catalog/intro/index")
        },
        {
          path: "catalog/lab1",
          component: () => import("@/pages/dashboard/catalog/lab1")
        },
        {
          path: "catalog/lab2",
          component: () => import("@/pages/dashboard/catalog/lab2")
        },
        {
          path: "catalog/lab3",
          component: () => import("@/pages/dashboard/catalog/lab3")
        },
        {
          path: "catalog/lab4",
          component: () => import("@/pages/dashboard/catalog/lab4")
        },
        {
          path: "catalog/lab5",
          component: () => import("@/pages/dashboard/catalog/lab5")
        },
        {
          path: "catalog/lab6",
          component: () => import("@/pages/dashboard/catalog/lab6")
        },
        {
          path: "catalog/lab7",
          component: () => import("@/pages/dashboard/catalog/lab7")
        },
        {
          path: "catalog/lab8",
          component: () => import("@/pages/dashboard/catalog/lab8")
        },
        {
          path: "catalog/lab9",
          component: () => import("@/pages/dashboard/catalog/lab9")
        },
        {
          path: "ispf/lab",
          redirect: "ispf/lab/master",
          component: () => import("@/pages/dashboard/ispf/lab/index"),
          children: [
            {
              path: "master",
              component: () => import("@/components/Console/Panel/MaterPanel")
            },
            {
              path: "is",
              component: () => import("@/components/Console/Panel/IsmfPanel")
            },
            {
              path: "is/:option",
              name: "isoption",
              component: () => import("@/components/Console/Panel/ismf/Main")
            },
            {
              path: "is/0/0",
              component: () =>
                import("@/components/Console/Panel/ismf/Is00profile")
            },
            {
              path: "is/7/2",
              component: () =>
                import("@/components/Console/Panel/ismf/Is72auto")
            },
            {
              path: "p",
              component: () => import("@/components/Console/Panel/PdfPanel")
            },
            {
              path: "data-set-utility",
              name: "p32",
              component: () => import("@/components/Console/Panel/pdf/DsuPanel")
            },
            {
              path: "data-set-list-utility",
              name: "p34",
              component: () =>
                import("@/components/Console/Panel/pdf/DsluPanel")
            },
            {
              path: "allocate-dataset",
              component: () =>
                import("@/components/Console/Panel/pdf/AllocatePanel")
            },
            {
              path: "dslist",
              component: () =>
                import("@/components/Console/Panel/pdf/DslistPanel")
            },
            {
              path: "jcl",
              component: () => import("@/components/Console/Panel/pdf/JCLPanel")
            },
            {
              path: "pdslist",
              component: () =>
                import("@/components/Console/Panel/pdf/PdslistPanel")
            }
          ]
        }
      ]
    },
    teacher,
    {
      path: "/auth",
      component: AuthLayout,
      redirect: "/auth/login",
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("@/pages/auth/login")
        }
      ]
    },
    {
      path: "*",
      component: () => import("@/pages/404")
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
      next("/auth/login");
    }
  }
  next();
});

export default router;
