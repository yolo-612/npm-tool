import type { RouteRecordRaw } from 'vue-router';
import { DEFAULT_LAYOUT } from '@/router/base';

const dashboard: RouteRecordRaw = {
  path: '/dashboard/workplace',
  name: 'workplace',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '工作台-Router', // 页面tab显示的名称
    icon: 'HomeFilled', // 菜单icon
    permission: ['*'],
    order: 100,
  },
  children: [
    {
      path: '',
      name: 'workplacePage',
      component: () => import('@/pages/dashboard/workplace.vue'),
      meta: {
        title: '工作台', // 页面tab显示的名称
        permission: ['*'],
        activeMenu: '/dashboard/workplace',
        hideInMenu: true,
      },
    },
  ],
};

export default dashboard;
