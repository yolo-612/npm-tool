import type { RouteRecordRaw } from 'vue-router';
import { DEFAULT_LAYOUT } from '@/router/base';

const dashboard: RouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: DEFAULT_LAYOUT,
  redirect: '/dashboard/workplace',
  meta: {
    title: '工作台', // 页面tab显示的名称
    icon: 'Menu', // 菜单icon
    permission: ['*'],
  },
  children: [
    {
      path: 'workplace',
      name: 'workplace',
      component: () => import('@/pages/dashboard/workplace.vue'),
      meta: {
        title: '工作台', // 页面tab显示的名称
        permission: ['*'],
        activeMenu: '/dashboard',
        hideInMenu: true,
      },
    },
  ],
};

export default dashboard;
