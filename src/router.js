import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import SendSnap from "./views/SendSnap.vue";
import Snaps from "./views/Snaps.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/sendsnap",
      name: "sendsnap",
      component: SendSnap
    },
    {
      path: "/snaps",
      name: "snaps",
      component: Snaps
    }
  ]
});
