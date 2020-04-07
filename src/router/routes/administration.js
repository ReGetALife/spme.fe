import AdminLayout from "@/components/layouts/AdminLayout";

export default {
  path: "/administration",
  component: AdminLayout,
  children: [
    {
      path: "",
      name: "teach-home",
      component: () => import("@/components/administration/Overview")
    },
    {
      path: "check",
      name: "teach-check",
      component: () => import("@/components/administration/Mark")
    },
    {
      path: ":name",
      name: "details",
      component: () => import("@/components/administration/LabDetail")
    }
  ]
};
