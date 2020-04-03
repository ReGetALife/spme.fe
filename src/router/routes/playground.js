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
    {
      path: "catalog/:subLab",
      component: () => import("@/components/Catalog")
    },
    {
      path: "ispf",
      component: () => import("@/components/common/ispf/ISPF")
    }
  ]
};
