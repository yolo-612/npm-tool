import { NOT_FOUND_ROUTE, RELOAD_ROUTE, DEFAULT_LAYOUT } from '@/router/base';

import operation from './modules/operation'
const routesList = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: DEFAULT_LAYOUT,
    redirect: '/home/index',
    meta: {
      title: '首页',// 页面tab显示的名称
      icon:'Menu', // 菜单icon
      permission: ['*'],
    },
    children: [
      {
        path: '/home/index',
        name: 'workplace',
        component: ()=>import('@/pages/home.vue'),
        meta: {
          title: '首页',// 页面tab显示的名称
          permission: ['*'],
          activeMenu: '/home',
          hideInMenu: true,
        },
      }
    ]
  },
  operation,
  RELOAD_ROUTE,
  NOT_FOUND_ROUTE
]


/**
 * 静态路由
 */
const constantRoutes = routesList;

/**
 * 文件系统路由
 */
// const fileSystemRoutes = setupLayouts(routes);
const fileSystemRoutes = [];

export {
  constantRoutes,
  fileSystemRoutes,
};

