import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress';

import { setRouteEmitter } from '@/utils/route-listener';
import globalSettings from '@/settings';
import { constantRoutes, fileSystemRoutes } from './routes';
import {useMenuStore, useSettingsStore} from "@/stores";
import { handleHotUpdate } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory('/'),
  routes: globalSettings.routeBaseOn === 'frontend' ? constantRoutes : fileSystemRoutes,
})

//【热更新】基于文件系统路由 的插件中，当路由文件变更时，动态更新路由配置，而无需手动刷新页面。
// TODO：似乎并没有生效
if (import.meta.hot && globalSettings.routeBaseOn === 'filesystem') {
  handleHotUpdate(router)
}

router.beforeEach(async(to, from) => {
  const settingsStore = useSettingsStore();
  const menuStore = useMenuStore();

  setRouteEmitter(to);
  NProgress.start();
  if(to && to.meta?.title){
    document.title = to.meta.title + '-' + import.meta.env.VITE_APP_TITLE;
  }
  // 导航栏如果不是 head-side 模式，则需要根据 path 定位主导航的选中状态
  if(settingsStore.settings.menu.menuMode === 'head-side') {
    menuStore.setActived(to.path)
  } 
  return true
})

router.afterEach(async(to, from) => {
  if(to && to.meta?.title){
    document.title = to.meta.title + '-' + import.meta.env.VITE_APP_TITLE;
  }
  NProgress.done();
  return true
})

export default router
