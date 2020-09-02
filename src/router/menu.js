import { baseLayout, emptyLayout } from '@/layout';
import store from '@/store';
import router from './index';

// 系统菜单、路由
const systemRoutes = [
  {
    name: 'index',
    component: baseLayout,
    path: '/',
    redirect: '/dashborad',
    title: '首页',
    meta: {
      title: '首页',
    },
    children: [],
  },
  {
    name: 'login',
    component: () => import('@/views/login'),
    path: '/login',
    title: '登录',
    meta: {
      title: '登录',
    },
  },
];

// 自定义菜单、路由
const customRoutes = [
  {
    name: 'dashborad',
    component: resolve => require(['@/views/dashborad'], resolve),
    path: '/dashborad',
    title: '控制台',
    meta: {
      title: '控制台',
      icon: '', // icon 显示区域暂未完善
    },
  },
  {
    name: 'example',
    component: () => import('@/views/product/tag/'),
    path: '/product/tag',
    title: '示例菜单',
    meta: {
      title: '示例菜单',
      icon: '',
      isShow: true,
    },
  },
  {
    name: 'example',
    component: () => import('@/views/product/tag/'),
    path: '/product/tag',
    title: '隐藏菜单',
    meta: {
      title: '隐藏菜单',
      icon: '',
      isShow: false, // 在主菜单上隐藏的路由
    },
  },
];

// 添加动态路由
// store.subscribe((mutation, state) => {
//   if (mutation.type == 'SET_DYNAMIC_MENU') {
//     store.commit('SET_MENU', []);
//     const newRoutes = mutation.payload;
//     const dynamicRoutes = relationComponentsToRoute(newRoutes);
//     const tempData = customRoutes.concat(dynamicRoutes);
//     systemRoutes[0].children = tempData;
//     store.commit('SET_MENU', systemRoutes[0].children);
//     router.addRoutes(dynamicRoutes);
//   }
// });

// // 动态路由关联组件
// function relationComponentsToRoute(route) {
//   route.forEach(item => {
//     if (typeof item.component === 'undefined') {
//       if (item.children) {
//         item.component = baseLayout;
//       } else {
//         item.component = () => import(`../views${item.path}/index.vue`); // 这里 import 路径不能用变量
//       }
//       item.meta = {
//         title: item.title,
//       };
//     }
//     if (typeof item.children !== 'undefined' && item.children.length > 0) {
//       item = relationComponentsToRoute(item.children);
//     }
//   });
//   return route;
// }

// 添加自定义路由
systemRoutes[0].children = customRoutes;
store.commit('SET_MENU', systemRoutes[0].children);

export default systemRoutes;
