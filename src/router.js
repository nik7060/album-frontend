import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/",
    alias: "/albums",
    name: "albums",
    component: () => import("./views/AlbumsList.vue")
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("./views/EditAlbum.vue"),
    props: true
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./views/AddAlbum.vue")
  },
  {
    path: "/view/:id",
    name: "view",
    component: () => import("./views/ViewAlbum.vue"),
    props: true
  },
  {
    path: "/addSong/:albumId",
    name: "addSong",
    component: () => import("./views/AddSong.vue"),
    props: true
  },
  {
    path: "/editSong/:albumId/:songId/:albumTitle",
    name: "editSong",
    component: () => import("./views/EditSong.vue"),
    props: true
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/Login.vue")
  },
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/tutorial-frontend-1/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;