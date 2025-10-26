import type { RouteRecordRaw } from 'vue-router';
import { DEFAULT_LAYOUT } from '@/router/base';

const app1: RouteRecordRaw = {
  path: '/app1',
  name: 'app1',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '微应用1', // 页面tab显示的名称
    icon: 'HomeFilled', // 菜单icon
    permission: ['*'],
    order: 100,
  },
};

export default app1;
