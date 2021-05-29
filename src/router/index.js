import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: require("@/components/home/Home").default
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
