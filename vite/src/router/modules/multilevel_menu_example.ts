import { DEFAULT_LAYOUT } from '@/router/base';

export default {
  path: '/multilevel_menu_example',
  redirect: '/multilevel_menu_example/page1',
  name: '/multilevel_menu_example',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '多级菜单',
    icon: 'Menu',
    permission: ['*'],
  },
  children: [
    {
      path: '/multilevel_menu_example/page1',
      name: '/multilevel_menu_example/page1',
      component: ()=>import('@/pages/multilevel_menu_example/page1.vue'),
      meta: {
        title: '导航1',
        permission: ['*'],
      },
    },
    {
      path: '/multilevel_menu_example/page2',
      redirect: '/multilevel_menu_example/page2/page2-1',
      name: '/multilevel_menu_example/page2',
      meta: {
        title: '导航2',
        permission: ['*'],
      },
      children: [
        {
          path: '/multilevel_menu_example/page2/page2-1',
          name: '/multilevel_menu_example/page2/page2-1',
          component: ()=>import('@/pages/multilevel_menu_example/page2/page2-1.vue'),
          meta: {
            title: '导航2-1',
            permission: ['*'],
          },
        },
        {
          path: '/multilevel_menu_example/page2/page2-2',
          name: '/multilevel_menu_example/page2/page2-2',
          component: ()=>import('@/pages/multilevel_menu_example/page2/page2-2.vue'),
          meta: {
            title: '导航2-2',
            permission: ['*'],
          },
        },
        {
          path: '/multilevel_menu_example/page2/page2-3',
          name: '/multilevel_menu_example/page2/page2-3',
          redirect: '/multilevel_menu_example/page2/page2-3/page2-3-1',
          meta: {
            title: '导航2-3',
            permission: ['*'],
          },
          children: [
            {
              path: '/multilevel_menu_example/page2/page2-3/page2-3-1',
              name: '/multilevel_menu_example/page2/page2-3/page2-3-1',
              component: ()=>import('@/pages/multilevel_menu_example/page2/page2-3/page2-3-1.vue'),
              meta: {
                title: '导航2-3-1',
                permission: ['*'],
              },
            },
            {
              path: '/multilevel_menu_example/page2/page2-3/page2-3-2',
              name: '/multilevel_menu_example/page2/page2-3/page2-3-2',
              component: ()=>import('@/pages/multilevel_menu_example/page2/page2-3/page2-3-2.vue'),
              meta: {
                title: '导航2-3-2',
                permission: ['*'],
              },
            },
          ]
        }
      ]
    }
  ]
}