import PlaygroundLayout from "@/components/layouts/PlaygroundLayout";

export default {
  path: "/playground",
  component: PlaygroundLayout,
  children: [
    {
      path: "",
      component: () => import("@/pages/playground/reports")
    },
    {
      path: "rexx/intro",
      component: () => import("@/pages/playground/rexx/intro/index")
    },
    {
      path: "rexx/lab1",
      component: () => import("@/pages/playground/rexx/lab1")
    },
    {
      path: "rexx/lab2",
      component: () => import("@/pages/playground/rexx/lab2")
    },
    {
      path: "rexx/lab3",
      component: () => import("@/pages/playground/rexx/lab3")
    },
    {
      path: "rexx/lab4",
      component: () => import("@/pages/playground/rexx/lab4")
    },
    {
      path: "rexx/lab5",
      component: () => import("@/pages/playground/rexx/lab5")
    },
    {
      path: "rexx/lab6",
      component: () => import("@/pages/playground/rexx/lab6")
    },
    {
      path: "rexx/lab7",
      component: () => import("@/pages/playground/rexx/lab7")
    },
    {
      path: "racf/:lab",
      component: () => import("@/pages/playground/racf/index")
    },
    {
      path: "dfsms/:lab",
      redirect: "dfsms/:lab/master",
      name: "lab",
      component: () => import("@/pages/playground/dfsms/lab"),
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
          component: () => import("@/components/Console/Panel/ismf/Is00profile")
        },
        {
          path: "is/7/2",
          component: () => import("@/components/Console/Panel/ismf/Is72auto")
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
          component: () => import("@/components/Console/Panel/pdf/DsluPanel")
        },
        {
          path: "allocate-dataset",
          component: () =>
            import("@/components/Console/Panel/pdf/AllocatePanel")
        },
        {
          path: "dslist",
          component: () => import("@/components/Console/Panel/pdf/DslistPanel")
        },
        {
          path: "jcl",
          component: () => import("@/components/Console/Panel/pdf/JCLPanel")
        },
        {
          path: "pdslist",
          component: () => import("@/components/Console/Panel/pdf/PdslistPanel")
        }
      ]
    },
    {
      path: "catalog/intro",
      component: () => import("@/pages/playground/catalog/intro/index")
    },
    {
      path: "catalog/lab1",
      component: () => import("@/pages/playground/catalog/lab1")
    },
    {
      path: "catalog/lab2",
      component: () => import("@/pages/playground/catalog/lab2")
    },
    {
      path: "catalog/lab3",
      component: () => import("@/pages/playground/catalog/lab3")
    },
    {
      path: "catalog/lab4",
      component: () => import("@/pages/playground/catalog/lab4")
    },
    {
      path: "catalog/lab5",
      component: () => import("@/pages/playground/catalog/lab5")
    },
    {
      path: "catalog/lab6",
      component: () => import("@/pages/playground/catalog/lab6")
    },
    {
      path: "catalog/lab7",
      component: () => import("@/pages/playground/catalog/lab7")
    },
    {
      path: "catalog/lab8",
      component: () => import("@/pages/playground/catalog/lab8")
    },
    {
      path: "catalog/lab9",
      component: () => import("@/pages/playground/catalog/lab9")
    },
    {
      path: "ispf/lab",
      redirect: "ispf/lab/master",
      component: () => import("@/pages/playground/ispf/lab/index"),
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
          component: () => import("@/components/Console/Panel/ismf/Is00profile")
        },
        {
          path: "is/7/2",
          component: () => import("@/components/Console/Panel/ismf/Is72auto")
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
          component: () => import("@/components/Console/Panel/pdf/DsluPanel")
        },
        {
          path: "allocate-dataset",
          component: () =>
            import("@/components/Console/Panel/pdf/AllocatePanel")
        },
        {
          path: "dslist",
          component: () => import("@/components/Console/Panel/pdf/DslistPanel")
        },
        {
          path: "jcl",
          component: () => import("@/components/Console/Panel/pdf/JCLPanel")
        },
        {
          path: "pdslist",
          component: () => import("@/components/Console/Panel/pdf/PdslistPanel")
        }
      ]
    }
  ]
};
