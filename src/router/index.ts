import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import store from "@/store";
import HomePage from "../views/HomePage.vue";
import Login from "../views/Login.vue";
import GetStarted from "../views/GetStarted.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/get-started",
  },
  {
    path: "/home",
    name: "home",
    component: HomePage,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/get-started",
    name: "get-started",
    component: GetStarted,
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Tab1Page.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/Tab2Page.vue"),
      },
      {
        path: "tab3",
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
  //check if current user is authenticated
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

  //store.dispatch(Actions.VERIFY_AUTH);

  next();
});

export default router;
