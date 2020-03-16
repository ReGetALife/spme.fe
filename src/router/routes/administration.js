import AdminLayout from "@/components/layouts/AdminLayout";

export default {
  name: "administration",
  path: "/administration",
  component: AdminLayout,
  children: [
    {
      path: "",
      name: "teach-home",
      component: () => import("../../pages/teacher/home/index")
    },
    {
      path: "check",
      name: "teach-check",
      component: () => import("../../pages/teacher/check/index")
    },
    {
      path: ":name",
      name: "details",
      component: () => import("../../pages/teacher/detail/index")
    }
  ]
};
