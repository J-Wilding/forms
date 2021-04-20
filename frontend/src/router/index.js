import Vue from "vue";
import VueRouter from "vue-router";
// import StartPage from "../views/StartPage.vue";
// import VideoTask from "../views/VideoTask.vue";
// import ImageTask from "../views/ImgSearchTask.vue";
import Survey from "../views/Survey.vue";
import Home from "../views/Home.vue";
// import Exit from "../views/Exit.vue";
// import PrepData from "../views/PrepData.vue";
// import PrepVideo from "../views/PrepVideo.vue";
// import PrepImageSearch from "../views/PrepImageSearch.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/survey",
    name: "Survey",
    component: Survey,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
