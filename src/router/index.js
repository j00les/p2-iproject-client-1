import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ChatView from "../views/ChatView.vue";
import LoginView from "../views/LoginView.vue";
import DetailView from "../views/DetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/chat",
      name: "chat",
      component: ChatView,
    },

    {
      path: "/detail/:id",
      name: "detail",
      component: DetailView,
    },

    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

router.beforeEach((to, from) => {
  if (!localStorage.getItem("access_token") && to.path === "/") {
    return { path: "/login" };
  } else if (localStorage.getItem("access_token") && to.path === "/login") {
    return { path: "/" };
  }
});

export default router;
