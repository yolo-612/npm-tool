/**
 * 默认布局组件
 */
export const DEFAULT_LAYOUT = () => import('@/layouts/default.vue');

/**
 * index路由
 */
export const INDEX_ROUTE = {
  name: 'index',
  path: '/',
  redirect: '/dashboard',
  meta: {
    hideInMenu: true,
  },
};

/**
 * 404路由
 */
export const NOT_FOUND_ROUTE = {
  path: '/:path(.*)*',
  name: 'notFound',
  component: () => import('@/layouts/default.vue'),
  children: [{
    path: '',
    name: 'notFound',
    component: () => import('@/pages/404.vue'),
    meta: {
      title: '404',
      hideInMenu: true,
    },
  }],
};

/**
 * 重新加载
 */
export const RELOAD_ROUTE = {
  path: '/reload',
  name: 'reload',
  component: () => import('@/pages/reload.vue'),
  meta: {
    title: '重新加载',
    hideInMenu: true,
  },
};
