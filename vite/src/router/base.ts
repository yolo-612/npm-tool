
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
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  // component: () => import('@/pages/404.vue'),
  //  [...all].vue 这种语法书写文件名通常出现在 文件路由系统 中（如 Nuxt.js / unplugin-vue-router）。
  // [...all].vue 表示匹配所有路径，等同于 Vue Router 的 通配符 /:pathMatch(.*)*。
  component: () => import('@/pages/[...all].vue'), 
  meta: {
    title: '404',
    hideInMenu: true,
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
    hideInMenu: true,
  },
}
