import type { RouteRecordRaw } from 'vue-router';

import { NOT_FOUND_ROUTE, RELOAD_ROUTE, INDEX_ROUTE } from '@/router/base';
import forEachDeep from '@/utils/function/forEachDeep';

/**
 * 遍历路由，添加面包屑相关参数
 * @param routesList
 */
function handleRoutes(routesList: RouteRecordRaw[]) {
  forEachDeep<RouteRecordRaw>(routesList, (route, parent) => {
    if (!route.meta) {
      route.meta = {};
    }
    // 如果当前路由path不是以'/'开头，需要拼接父路由path
    route.path = route.path.charAt(0) === '/' || route.meta?.isLink ? route.path : `${parent?.path || ''}${route.path ? '/' : ''}${route.path}`;

    // 添加父路由引用，方便遍历
    route.meta.__parent__ = parent;
    // TODO: 面包屑
    // route.meta._breadcrumbList = getBreadcrumbList(route);
    return false
  });

  return routesList;
}

/**
 * 从模块中获取路由
 */
function getRoutesFromModules() {
  const modules = import.meta.glob('./modules/*.ts', { eager: true });

  function formatModules(_modules: any, result: RouteRecordRaw[]) {
    Object.keys(_modules).forEach((key) => {
      const defaultModule = _modules[key].default;
      if (!defaultModule) return;
      const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule];
      result.push(...moduleList);
    });
    return result;
  }

  const appRoutes: RouteRecordRaw[] = formatModules(modules, []);

  const routesList: RouteRecordRaw[] = [INDEX_ROUTE, ...appRoutes, RELOAD_ROUTE, NOT_FOUND_ROUTE];

  return routesList;
}


/**
 * 静态路由
 */
const constantRoutes =  handleRoutes(getRoutesFromModules());

/**
 * 文件系统路由
 */
// const fileSystemRoutes = setupLayouts(routes);
const fileSystemRoutes = [];

export {
  constantRoutes,
  fileSystemRoutes,
};

