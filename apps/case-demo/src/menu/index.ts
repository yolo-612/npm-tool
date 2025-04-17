import type { MenuItem } from '@/stores/modules/menu/types';

const menus: MenuItem[] = [
  {
    path: '/dashboard/workplace',
    title: '工作台-frontend',
    icon: 'HomeFilled',
    order: 100,
    children: [],
  },
  {
    path: '/multiDialogMan',
    title: '多弹窗管理',
    icon: 'Opportunity',
    children: [
      {
        path: '/multiDialogMan/background',
        title: '背景',
        children: [],
      },
      {
        path: '/multiDialogMan/solution',
        title: '解决方案',
        children: [],
      },
      {
        path: '/multiDialogMan/config',
        title: '弹窗项配置',
        children: [],
      },
    ],
  },
]
export default menus;
