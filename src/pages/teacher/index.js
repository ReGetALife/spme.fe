import AdminLayout from "@/layouts/adminLayout";

export default {
  name: "teacher",
  path: "/administration",
  redirect: "/administration/overview",
  component: AdminLayout,
  children: [
    {
      path: "overview",
      name: "teach-home",
      component: () => import("./home")
    },
    {
      path: "check",
      name: "teach-check",
      component: () => import("./check")
    },
    {
      path: ":name",
      name: "details",
      component: () => import("./detail")
    }
  ]
};
