import type { RouteRecordRaw } from 'vue-router';
import { cloneDeep } from 'lodash-es';
import type { MenuTreeAdapter, MenuItem, BaspCustomizeData } from '@/stores/modules/menu/types';
import { getMenus } from '@/apis/methods/menu';
import { queryMenusTree } from '@/apis/methods/basp';
import { baspMenusFormat } from '@/modules/sf-basp';
import menu from '@/menu';
import type { BaspModule } from '@/modules/sf-basp/types';
import forEachDeep from '@/utils/function/forEachDeep';
import router from '@/router';

/**
 * 从前端配置获取菜单树
 */
export const getMenuTreeFromFrontend:MenuTreeAdapter = async (routes, roleCode?:string, baspRoleMenus?: BaspModule[]) => {
  const targetMenu = cloneDeep(menu);
  const menuPathMap: any = {
    '/': targetMenu,
  };
  forEachDeep(targetMenu, (item) => {
    menuPathMap[item.path] = item;
  });

  // 解析百源菜单到用户菜单
  const parseBaspMenu = (data: BaspModule, parentPath: string, index: number) => {
    const parseData = parseMenuTypeTargetUrl(data.helpUrl);
    data.parentPath = parentPath;
    if (parseData?.type !== 'embedded') {
      // 如果当前是嵌入的则认为子菜单的都是嵌入的，否则继续查找子的是否存在嵌入菜单
      data.childModules.forEach((item, index) => parseBaspMenu(item, data.moduleCode, index));
      return;
    }
    const baspMenu = transferBaspMenu(data);
    // index 百源中的顺序则为菜单的插入顺序
    // 支持多层级多节点添加内嵌页面
    if (baspMenu) menuPathMap[parentPath]?.splice(index, 0, baspMenu);
  };

  baspRoleMenus?.forEach((item, index) => parseBaspMenu(item, '/', index));
  return targetMenu;
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
export const getMenuTreeFromBackend:MenuTreeAdapter = async () => {
  const { success, obj } = await getMenus();
  if (success) {
    return obj;
  }
  return [];
};

/**
 * 从百源配置获取菜单树
 */
export const getMenuTreeFromBasp:MenuTreeAdapter = async () => {
  const { success, obj } = await queryMenusTree();
  if (success) {
    return baspMenusFormat(obj);
  }
  return [];
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
  } else if (baseOn === 'basp') {
    // 百源配置
    return getMenuTreeFromBasp;
  }
  return null;
};

/** 菜单类型解析 */
const parseMenuTypeTargetUrl = (helpUrl: string): BaspCustomizeData | null => {
  if (!helpUrl) return null;
  try {
    const data = JSON.parse(helpUrl);
    return { type: data.type, embeddedUrl: data.embeddedUrl, hideMenu: data.hideMenu };
  } catch (error) {
    return null;
  }
};

const addRouterFormBasp = (url: string, name: string, embeddedUrl: string) => {
  const routes = router.getRoutes();
  const existingRoute = routes.some((route) => route.path === url);
  if (url && !existingRoute) {
    const parentPath = `/${url.split('/')[1]}`;
    const parentRoute = routes.find((route) => route.path === parentPath);
    const childRoute = {
      path: url,
      name: url,
      component: () => import('@/components/app/Embedded.vue'),
      meta: {
        title: name,
        embeddedUrl,
        permission: [url],
        ignoreCache: true,
      },
    };

    if (!parentRoute) {
      // 如果父级路由不存在，则创建父级路由，注意父节点的 path 需要为 parentPath，不能为 path
      router.addRoute({
        path: parentPath,
        name: parentPath,
        children: [childRoute],
        component: () => import('@/layouts/default.vue'),
      });
      return;
    }
    router.addRoute(parentRoute.name, childRoute);
  }
};

/** 百源菜单转菜单树 */
const transferBaspMenu = (data: BaspModule): MenuItem | null => {
  const parseData = parseMenuTypeTargetUrl(data.helpUrl);
  if (!parseData) return null;
  const children = data.childModules.map((item) => transferBaspMenu(item)).filter((item) => item !== null);
  // 如果是叶节点，但是没有配置 embeddedUrl，则当前菜单不可用
  if (children.length === 0 && !parseData.embeddedUrl) return null;

  addRouterFormBasp(data.moduleCode, data.moduleName, parseData.embeddedUrl);
  // 需要隐藏的菜单，则添加路由就好了，无需额添加菜单
  if (parseData.hideMenu) return null;

  return {
    path: data.moduleCode,
    title: data.moduleName,
    icon: data.moduleIcon,
    permission: [data.moduleCode],
    isEmbedded: true,
    embeddedUrl: parseData.embeddedUrl,
    children,
  };
};
