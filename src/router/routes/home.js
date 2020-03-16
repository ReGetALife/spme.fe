import store from "@/store";

export default {
  path: "/",
  // Redirect base on user role
  // Navigation guards are not applied on the route that redirects, only on its target.
  // So you need to check login state and redirect to login page if necessary.
  redirect: () => {
    switch (store.state.user.role) {
      case "TEACHER":
        return "/administration";
      case "STUDENT":
        return "/playground";
      default:
        return "/login";
    }
  }
};
