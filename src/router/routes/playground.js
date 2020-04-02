import PlaygroundLayout from "@/components/layouts/PlaygroundLayout";

export default {
  path: "/playground",
  component: PlaygroundLayout,
  children: [
    {
      path: "",
      component: () => import("@/components/Reports")
    },
    {
      path: "rexx/:subLab",
      component: () => import("@/components/REXX")
    },
    {
      path: "racf/:subLab",
      component: () => import("@/components/RACF")
    },
    {
      path: "sms/:subLab",
      component: () => import("@/components/SMS")
    },
    // {
    //   path: "dfsms/:lab",
    //   redirect: "dfsms/:lab/master",
    //   name: "lab",
    //   component: () => import("@/pages/playground/dfsms/lab"),
    //   children: [
    //     {
    //       path: "master",
    //       component: () => import("@/components/Console/Panel/MaterPanel")
    //     },
    //     {
    //       path: "is",
    //       component: () => import("@/components/Console/Panel/IsmfPanel")
    //     },
    //     {
    //       path: "is/:option",
    //       name: "isoption",
    //       component: () => import("@/components/Console/Panel/ismf/Main")
    //     },
    //     {
    //       path: "is/0/0",
    //       component: () => import("@/components/Console/Panel/ismf/Is00profile")
    //     },
    //     {
    //       path: "is/7/2",
    //       component: () => import("@/components/Console/Panel/ismf/Is72auto")
    //     },
    //     {
    //       path: "p",
    //       component: () => import("@/components/Console/Panel/PdfPanel")
    //     },
    //     {
    //       path: "data-set-utility",
    //       name: "p32",
    //       component: () => import("@/components/Console/Panel/pdf/DsuPanel")
    //     },
    //     {
    //       path: "data-set-list-utility",
    //       name: "p34",
    //       component: () => import("@/components/Console/Panel/pdf/DsluPanel")
    //     },
    //     {
    //       path: "allocate-dataset",
    //       component: () =>
    //         import("@/components/Console/Panel/pdf/AllocatePanel")
    //     },
    //     {
    //       path: "dslist",
    //       component: () => import("@/components/Console/Panel/pdf/DslistPanel")
    //     },
    //     {
    //       path: "jcl",
    //       component: () => import("@/components/Console/Panel/pdf/JCLPanel")
    //     },
    //     {
    //       path: "pdslist",
    //       component: () => import("@/components/Console/Panel/pdf/PdslistPanel")
    //     }
    //   ]
    // },
    {
      path: "catalog/:subLab",
      component: () => import("@/components/Catalog")
    }
  ]
};
