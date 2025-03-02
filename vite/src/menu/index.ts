import type { MenuItem } from '@/stores/modules/menu/types';

export default [
  {
    path: '/dashboard/workplace',
    title: '工作台-frontend',
    icon: 'Menu',
    order: 100,
    children: [],
  },
  {
    path: '/multilevel_menu_example',
    title: '多级导航',
    icon: 'Menu',
    order: 10,
    children: [
      {
        path: '/multilevel_menu_example/page1',
        title: '导航1',
        order: 0,
        children: [],
      },
      {
        path: '/multilevel_menu_example/page2',
        title: '导航2',
        order: 0,
        children: [
          {
            path: '/multilevel_menu_example/page2/page2-1',
            title: '导航2-1',
            order: 0,
            children: [],
          },
          {
            path: '/multilevel_menu_example/page2/page2-2',
            title: '导航2-2',
            order: 0,
            children: [],
          },
          {
            path: '/multilevel_menu_example/page2/page2-3',
            title: '导航2-3',
            order: 0,
            children: [
              {
                path: '/multilevel_menu_example/page2/page2-3/page2-3-1',
                title: '导航2-3-1',
                order: 0,
                children: [],
              },
              {
                path: '/multilevel_menu_example/page2/page2-3/page2-3-2',
                title: '导航2-3-2',
                order: 0,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/permission_example',
    title: '权限验证',
    icon: 'Menu',
    order: 10,
    children: [],
  },
  {
    path: '/about',
    title: '关于',
    icon: 'Menu',
    order: 0,
    children: [],
  },
] as MenuItem[];
