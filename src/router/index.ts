import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/get-started",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/get-started",
    name: "get-started",
    component: () => import("@/views/GetStarted.vue"),
  },
  {
    path: "/home/",
    component: () => import("@/views/HomePage.vue"),

    children: [
      {
        path: "",
        redirect: "/home/explore",
      },
      {
        path: "explore",
        component: () => import("@/views/Explore.vue"),
      },
      {
        path: "orders",
        component: () => import("@/views/Tab2Page.vue"),
      },
      {
        path: "cart",
        component: () => import("@/views/Tab3Page.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const unAuthenticationRoutes = ["get-started", "login"];
  store.dispatch("authVerify");
  setTimeout(() => {
    if (
      !unAuthenticationRoutes.includes(to.name as string) &&
      !store.getters.isUserAuthenticated
    ) {
      next({ name: "login" });
    } else if (
      unAuthenticationRoutes.includes(to.name as string) &&
      store.getters.isUserAuthenticated
    ) {
      next("/home");
    } else next();

    next();
  }, 100);
});

export default router;
