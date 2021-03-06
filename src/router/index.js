import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/Login.vue'),
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: () => import('../views/contacts/Index.vue'),
  },
  {
    path: "/companies",
    name: "Companies",
    component: () => import('../views/companies/Index.vue'),
  },
  {
    path: "/details/:id",
    name: "Details",
    component: () => import('../components/Details'),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;