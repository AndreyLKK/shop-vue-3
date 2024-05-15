import { createRouter, createWebHistory } from "vue-router";
import MyBookmarks from "@/сomponents/MyBookmarks.vue";
import MyHome from "@/pages/MyHome.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MyHome,
  },
  {
    path: "/bookmarks",
    name: "bookmarks",
    component: MyBookmarks,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
