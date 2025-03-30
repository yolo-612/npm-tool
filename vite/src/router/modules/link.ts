import { DEFAULT_LAYOUT } from '@/router/base';

export default {
  path: '/link',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '外链',
    icon: 'Link',
    order: 0,
  },
  children: [
    {
      path: 'https://github.com/yolo-612?tab=repositories',
      meta: {
        title: 'github',
        isLink: true,
      },
    },
    {
      path: '//yolo612.space.online',
      meta: {
        title: '在线简历',
        isLink: true,
      },
    },
  ],
};
