
/**
 * 默认布局组件
 */
export const DEFAULT_LAYOUT = () => import('@/layouts/AdminPage.vue');

/**
 * 404路由
 */
export const NOT_FOUND_ROUTE = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('@/pages/404.vue'),
  meta: {
    title: '404',
  },
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
  },
}
