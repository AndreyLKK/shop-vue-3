import { createRouter, createWebHashHistory } from "vue-router";
import MyBookmarks from "@/сomponents/MyBookmarks.vue";

const routes = [
  {
    path: "/bookmarks",
    name: "bookmarks",
    component: MyBookmarks,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
