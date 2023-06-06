import { createRouter, createWebHistory } from "vue-router";
import { localCache } from "@/utils/cache";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboadr",
      component: () => import("@/components/Tabbar/tabbar.vue"),
      children: [
        {
          path: "/",
          redirect: "/home",
        },
        {
          path: "home",
          name: "home",
          component: () => import("@/views/main/main-home/home-page.vue"),
          meta: {
            active: 0,
          },
        },
        {
          path: "search",
          name: "search",
          component: () => import("@/views/main/main-search/search.vue"),
          meta: {
            active: 1,
          },
        },
        {
          path: "moment",
          name: "moment",
          component: () => import("@/views/main/main-moment/moment.vue"),
          meta: {
            active: 2,
          },
        },
        {
          path: "account",
          name: "account",
          component: () => import("@/views/main/main-account/account.vue"),
          meta: {
            active: 3,
          },
        },
        {
          path: "home-search",
          name: "home-search",
          component: () =>
            import("@/views/main/main-home/c-cnps/home-search.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/Login.vue"),
    },
    {
      path: "/playlist",
      name: "playlist",
      component: () => import("@/components/common/playlist/playlist.vue"),
    },
    {
      path: "/playlist-list",
      name: "playlist-list",
      component: () =>
        import("@/components/common/playlist-list/playlist-list.vue"),
    },
    {
      path: "/play-page",
      name: "play-page",
      component: () => import("@/components/common/play/c-cnps/play-page.vue"),
    },
    {
      path: "/play-comment",
      name: "play-comment",
      component: () =>
        import("@/components/common/play/c-cnps/play-comment.vue"),
    },
    // {
    //   path: "/logintest",
    //   name: "logintest",
    //   component: () => import("@/views/login/logintest.vue"),
    // },
  ],
});
// router.beforeEach((to) => {
//   console.log("执行了路由守卫");
//   const cookie = localCache.getCache("cookie");
//   if (to.path === "/main" && !cookie) {
//     return "/login";
//   }

// });

export default router;
