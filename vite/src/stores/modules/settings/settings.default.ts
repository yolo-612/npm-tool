import type { Settings } from '@/stores/modules/settings/types';

const defaultSettings: Settings = {
  theme: 'red',
  enablePermission: true,
  tabBar: true,
  breadcrumb: true,
  routeBaseOn: 'filesystem',
  ignoreRouteCache: false,
  hiddenNewCodeTool: false,
  hiddenTopHeader: false,
  menu: {
    baseOn: 'routes',
    menuMode: 'side',
  },
  stretch: false
};

export default defaultSettings;
