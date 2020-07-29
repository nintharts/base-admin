import Vue from 'vue';
import VueRouter from 'vue-router';
import menus from './menu';

Vue.use(VueRouter);

const routes = menus;

console.log(routes);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
