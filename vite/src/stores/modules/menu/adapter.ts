import type { RouteRecordRaw } from 'vue-router';
import type { MenuTreeAdapter, MenuItem } from '@/stores/modules/menu/types';
import menu from '@/menu';

/**
 * 从前端配置获取菜单树
 */
export const getMenuTreeFromFrontend:MenuTreeAdapter = async () => {
  return menu;
};

const getMenusFromRouter = (routes: readonly RouteRecordRaw[] | undefined):MenuItem[] => {
  if (!routes || routes.length === 0) return [];

  return routes.filter((route) => !route.meta?.hideInMenu).map((route) => {
    const { meta = {} } = route;
    return {
      path: route.path,
      title: meta.title || '',
      icon: meta.icon,
      order: meta.order ?? 0,
      isLink: meta.isLink,
      children: getMenusFromRouter(route.children),
      permission: meta.permission,
    };
  });
};

/**
 * 从路由生成菜单树
 * @param routes
 */
export const getMenuTreeFromRouter:MenuTreeAdapter = async (routes) => {
  return getMenusFromRouter(routes);
};

/**
 * 从后端获取菜单树
 */
export const getMenuTreeFromBackend: MenuTreeAdapter = async () => {
  const res = await Promise.resolve([]);
  return res;
};


export const getMenuTreeAdapter = (baseOn:string):MenuTreeAdapter|null => {
  if (baseOn === 'frontend') {
    // 前端配置，文件系统路由只支持前端配置菜单
    return getMenuTreeFromFrontend;
  } else if (baseOn === 'routes') {
    // 根据路由生成
    return getMenuTreeFromRouter;
  } else if (baseOn === 'backend') {
    // 后端配置
    return getMenuTreeFromBackend;
  }
  return null;
};
