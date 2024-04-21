import { createRouter, createWebHistory } from 'vue-router'
import {routes} from './routes.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async(to, from) => {
  if(to && to.meta?.title){
    document.title = to.meta.title + " - YOLO"
  }
  return true
})

export default router
