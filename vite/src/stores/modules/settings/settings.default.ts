import type { Settings } from '@/stores/modules/settings/types';

const defaultSettings: Settings = {
  theme: 'red',
  enablePermission: true,
  tabBar: true,
  breadcrumb: true,
  routeBaseOn: 'frontend',
  ignoreRouteCache: false,
  hiddenNewCodeTool: false,
  hiddenTopHeader: false,
  menu: {
    baseOn: 'routes',
  },
};

export default defaultSettings;
