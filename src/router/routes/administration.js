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
      path: ":lab",
      name: "details",
      component: () => import("@/components/administration/LabDetail")
    },
    {
      path: ":lab/:uid",
      component: () => import("@/components/administration/Mark")
    }
  ]
};
