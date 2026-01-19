import type { MockMethod } from 'vite-plugin-mock';

const menu = [
  {
    helpUrl: '/dashboard/workplace',
    moduleName: '工作台-basp',
    moduleIcon: 'SfHome',
    sort: 100,
    childModules: [],
  },
  {
    helpUrl: '/multilevel_menu_example',
    moduleName: '多级导航',
    moduleIcon: 'SfTextLeftJustified',
    sort: 10,
    childModules: [
      {
        helpUrl: '/multilevel_menu_example/page1',
        moduleName: '导航1',
        sort: 0,
        childModules: [],
      },
      {
        helpUrl: '/multilevel_menu_example/page2',
        moduleName: '导航2',
        sort: 0,
        childModules: [
          {
            helpUrl: '/multilevel_menu_example/page2/page2-1',
            moduleName: '导航2-1',
            sort: 0,
            childModules: [],
          },
          {
            helpUrl: '/multilevel_menu_example/page2/page2-2',
            moduleName: '导航2-2',
            sort: 0,
            childModules: [],
          },
          {
            helpUrl: '/multilevel_menu_example/page2/page2-3',
            moduleName: '导航2-3',
            sort: 0,
            childModules: [
              {
                helpUrl: '/multilevel_menu_example/page2/page2-3/page2-3-1',
                moduleName: '导航2-3-1',
                sort: 0,
                childModules: [],
              },
              {
                helpUrl: '/multilevel_menu_example/page2/page2-3/page2-3-2',
                moduleName: '导航2-3-2',
                sort: 0,
                childModules: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    helpUrl: '/permission_example',
    moduleName: '权限验证',
    moduleIcon: 'SfLimitsOfAuthority',
    sort: 10,
    childModules: [],
  },
  {
    helpUrl: '/about',
    moduleName: '关于',
    moduleIcon: 'SfTag',
    sort: 0,
    childModules: [],
  },
];

export default [
  {
    url: '/dev-basp-user/indexModule/queryMenusTree1',
    timeout: 10,
    method: 'get',
    response: () => {
      return {
        succ: 'ok',
        msg: null,
        result: menu,
      };
    },
  },
] as MockMethod[];
