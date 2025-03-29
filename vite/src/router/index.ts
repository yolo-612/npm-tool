import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress';

import { setRouteEmitter } from '@/utils/route-listener';
import globalSettings from '@/settings';
import { constantRoutes, fileSystemRoutes } from './routes';
import {useMenuStore, useSettingsStore} from "@/stores";

const router = createRouter({
  history: createWebHistory('/'),
  routes: globalSettings.routeBaseOn === 'frontend' ? constantRoutes : fileSystemRoutes,
})

router.beforeEach(async(to, from) => {
  const settingsStore = useSettingsStore();
  const menuStore = useMenuStore();

  setRouteEmitter(to);
  NProgress.start();
  if(to && to.meta?.title){
    document.title = to.meta.title + " - YOLO"
  }
  // 导航栏如果不是 head-side 模式，则需要根据 path 定位主导航的选中状态
  if(settingsStore.settings.menu.menuMode === 'head-side') {
    menuStore.setActived(to.path)
  } 
  return true
})

router.afterEach(async(to, from) => {
  if(to && to.meta?.title){
    document.title = to.meta.title + " - YOLO"
  }
  NProgress.done();
  return true
})

export default router
