import { baseLayout, emptyLayout } from '@/layout';

// 系统菜单、路由
const systemRoutes = [
  {
    name: 'index',
    component: baseLayout,
    path: '/',
    redirect: '/dashborad',
    meta: {
      title: '首页',
    },
    children: [],
  },
  {
    name: 'login',
    component: () => import('@/views/login'),
    path: '/login',
    meta: {
      title: '登录',
    },
  },
];

// 自定义菜单、路由
const customRoutes = [
  {
    name: 'dashborad',
    component: () => import('@/views/dashborad'),
    path: '/dashborad',
    meta: {
      title: 'Dashborad',
    },
    children: [],
  },
  {
    name: 'setting',
    component: () => import('@/views/setting'),
    path: '/setting',
    meta: {
      title: '设置',
    },
    children: [
      {
        name: 'setting1',
        component: () => import('@/views/setting'),
        path: 'setting1',
        meta: {
          title: '设置1',
        },
      },
    ],
  },
];

systemRoutes[0].children = customRoutes;

export default systemRoutes;
