import Vue from 'vue';
import VueRouter from 'vue-router';
import menus from './menu';

Vue.use(VueRouter);

const routes = menus;

console.log(('routes', routes));

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.onError(err => {
  console.log(err);
});

// router.beforeEach((to, from, next) => {
//   console.log('beforeEach', to);
//   next();
// });

// router.beforeResolve((to, from, next) => {
//   console.log('beforeResolve', to);
//   next();
// });

export default router;
