import { DEFAULT_LAYOUT } from '@/router/base';

export default {
  path: '/permission_example',
  name: 'permission_example',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '权限验证',
    icon: 'Avatar',
    permission: ['*'],
    order: 10,
  },
  children: [
    {
      path: '',
      name: '/permission_example/',
      component: () => import(/* webpackChunkName:'home' */ '@/pages/permission_example/index.vue'),
      meta: {
        title: '权限验证', // 页面tab显示的名称
        permission: ['*'],
        activeMenu: '/permission_example',
        hideInMenu: true,
      },
    },
    {
      path: '/permission_example/no_permission',
      name: '/permission_example/no_permission',
      component: () => import(/* webpackChunkName:'home' */ '@/pages/permission_example/no_permission.vue'),
      meta: {
        title: '无权限路由', // 页面tab显示的名称
        permission: ['123123'], // 填写任意权限模拟无权限
        activeMenu: '/permission_example',
        hideInMenu: true,
      },
    },
  ],
};
