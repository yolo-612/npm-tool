import { defaultsDeep } from 'lodash-es';
import type { Settings } from '@/stores/modules/settings/types';
import defaultSettings from '@/stores/modules/settings/settings.default';

let settings: Settings = {
  theme: 'red',
  enablePermission: true,
  routeBaseOn: 'filesystem',
  menu: {
    baseOn: 'frontend',
  },
};

const globalSettings = defaultsDeep(settings, defaultSettings) as RecursiveRequired<Settings>;
if (globalSettings.routeBaseOn === 'filesystem') {
  // 文件系统路由时，由于文件系统路由会将2级以下的路由打平成一级路由，失去了层级关系，
  // 所以无法使用路由文件生成菜单模式和面包屑
  if (globalSettings.menu.baseOn === 'routes') {
    globalSettings.menu.baseOn = 'frontend';
  }

  globalSettings.breadcrumb = false;
}

export default globalSettings;
