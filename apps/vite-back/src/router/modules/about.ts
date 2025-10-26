import { DEFAULT_LAYOUT } from '@/router/base';

export default {
  path: '/about',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '关于',
    icon: 'HelpFilled',
    permission: ['*'],
    order: 0,
  },
  children: [
    {
      path: '',
      name: '/about',
      component: () => import(/* webpackChunkName:'home' */ '@/pages/about.vue'),
      meta: {
        title: '关于',
        permission: ['*'],
        activeMenu: '/about',
        hideInMenu: true,
      },
    },
  ],
};
