import { createRouter, createWebHistory } from 'vue-router'
import {routes} from './routes.js';
import NProgress from 'nprogress';

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

router.beforeEach(async(to, from) => {
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
