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
    icon: 'Avatar',
    order: 10,
    children: [],
  },
  {
    path: '/about',
    title: '关于',
    icon: 'HelpFilled',
    order: 0,
    children: [],
  },
  {
    path: '/link',
    title: '外链',
    icon: 'Link',
    order: 0,
    children: [
      {
        path: 'https://github.com/yolo-612?tab=repositories',
        title: 'github',
        isLink: true,
      },
      {
        path: '//yolo612.space.online',
        title: '在线简历',
        isLink: true,
      },
    ],
  },
]
export default menus;
