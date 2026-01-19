import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import { setRouteEmitter } from '@/utils/route-listener';
import globalSettings from '@/settings';
import { constantRoutes, fileSystemRoutes } from './routes';
import { NOT_FOUND_ROUTE } from './base';
// import { useMenuStore } from '@/stores';

console.log('globalSettings====', globalSettings);

// 菜单调整，不分老路由切换到新路由，兼容历史操作用，修改日期20250320，半年后可以删除掉
const redirectRoutes = [
  {
    // 新签线索维护
    path: '/activity/newClue',
    redirect: '/resourceOperate/newClue',
  },
  {
    // 销售营销管理
    path: '/activity/saleActivity',
    redirect: '/resourceOperate/saleActivity',
  },
  {
    // 额度卡-商品管理
    path: '/activity/quotaCard/product',
    redirect: '/prepaid/quotaCard/product',
  },
  {
    // 额度卡-订单管理
    path: '/activity/quotaCard/order',
    redirect: '/prepaid/quotaCard/order',
  },
  {
    // 额度卡-计价规则管理
    path: '/activity/quotaCard/priceRule',
    redirect: '/prepaid/quotaCard/priceRule',
  },
  {
    // 额度卡-调价券包管理
    path: '/activity/quotaCard/couponBar',
    redirect: '/prepaid/quotaCard/couponBar',
  },
];

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory('/admin/actmanage'),
  routes: (globalSettings.routeBaseOn === 'frontend' ? constantRoutes : fileSystemRoutes).concat(redirectRoutes, NOT_FOUND_ROUTE),
});

router.addRoute({
  path: '/new-about',
  redirect: '/about?from=hoho',
});

// router.beforeEach(async (to, from) => {
//   // const menuStore = useMenuStore();
//   // console.log('router to', to, router.getRoutes(), menuStore.menuTree);
//   // const preMenuTreeLength = menuStore.menuTree.length;
//   // await menuStore.menuInitPromise;
//   // if (preMenuTreeLength === 0) {
//   //   console.log(1231231, preMenuTreeLength, menuStore.menuTree)
//   //   next({ replace: true, path: to.path })
//   // } else {
//     setRouteEmitter(to);
//     NProgress.start();
//     if (to && to.meta?.title) {
//       document.title = to.meta.title + '-' + import.meta.env.VITE_APP_TITLE;
//     }
//     // next();
//     return true;
//   // }
// });

router.beforeEach(async (to, from) => {
  setRouteEmitter(to);
  NProgress.start();
  if (to && to.meta?.title) {
    document.title = to.meta.title + '-' + import.meta.env.VITE_APP_TITLE;
  }
  return true;
});

router.afterEach(async (to, from) => {
  if (to && to.meta?.title) {
    document.title = to.meta.title + '-' + import.meta.env.VITE_APP_TITLE;
  }
  NProgress.done();
  return true;
});

export default router;
