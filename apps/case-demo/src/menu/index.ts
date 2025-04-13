import type { MenuItem } from '@/stores/modules/menu/types';

const menus: MenuItem[] = [
  {
    path: '/dashboard/workplace',
    title: '工作台-frontend',
    icon: 'HomeFilled',
    order: 100,
    children: [],
  },
  // {
  //   path: '/multilevel_menu_example',
  //   title: '多级导航',
  //   icon: 'Menu',
  //   order: 10,
  //   children: [
  //     {
  //       path: '/multilevel_menu_example/page1',
  //       title: '导航1',
  //       order: 0,
  //       children: [],
  //     },
  //   ],
  // },
  {
    path: '/multiDialogMan',
    title: '多弹窗管理',
    icon: 'Opportunity',
    children: [
      // {
      //   path: '/multiDialogMan/index',
      //   title: '多弹窗项目',
      //   order: 0,
      //   children: [],
      // },
    ],
  },
]
export default menus;
