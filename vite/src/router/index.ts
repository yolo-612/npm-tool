import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress';

import { setRouteEmitter } from '@/utils/route-listener';
import globalSettings from '@/settings';
import { constantRoutes } from './routes';

const router = createRouter({
  history: createWebHistory('/'),
  routes: constantRoutes,
})

router.beforeEach(async(to, from) => {
  setRouteEmitter(to);
  NProgress.start();
  if(to && to.meta?.title){
    document.title = to.meta.title + " - YOLO"
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
