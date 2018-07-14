import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import Navbar from "./components/Navbar.vue";
import Subjects from "./components/Subjects.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/4",
      name: "Subjects",
      component: Subjects
    }
  ]
});
