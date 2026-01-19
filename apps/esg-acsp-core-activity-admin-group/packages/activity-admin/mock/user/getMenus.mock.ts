import type { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_utils';

const menu = [
  {
    path: '/dashboard/workplace',
    title: '工作台-backend',
    icon: 'SfHome',
    order: 100,
    children: [],
  },
  {
    path: '/multilevel_menu_example',
    title: '多级导航',
    icon: 'SfTextLeftJustified',
    order: 10,
    children: [
      {
        path: '/multilevel_menu_example',
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
    icon: 'SfLimitsOfAuthority',
    order: 10,
    children: [],
  },
  {
    path: '/about',
    title: '关于',
    icon: 'SfTag',
    order: 0,
    children: [],
  },
];

export default [
  {
    url: '/apis/demo/getMenus1',
    timeout: 200,
    method: 'get',
    response: () => {
      return resultSuccess(menu);
    },
  },
] as MockMethod[];
