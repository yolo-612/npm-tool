import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 全局路由拦截
router.beforeEach(async (to, from, next) => {
  const title = to.meta && to.meta.title ? `-${to.meta.title}` : '';
  if (next) {
    next();
  }
});

export default router;
