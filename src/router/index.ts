import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import MyBookmarks from "@/сomponents/MyBookmarks.vue";
import MyHome from "@/pages/MyHome.vue";

const routes: RouteRecordRaw[] = [ 
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
  history: createWebHashHistory(),
  routes,
});

export default router;
