import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import type { BreadcrumbItem } from '@/types';

/**
 * 获取面包屑
 * @param route
 */
export default function getBreadcrumbList(route: RouteRecordRaw): BreadcrumbItem[] {
  const list: BreadcrumbItem[] = [];
  function forEach(route: RouteRecordRaw) {
    const meta: RouteMeta = route.meta || {};
    if (route.path && meta.title && !meta.hideBreadcrumb && !meta.hideInMenu) {
      list.unshift({
        path: route.path,
        title: meta.title,
      });
    }
    if (meta.__parent__) {
      forEach(meta.__parent__);
    }
  }

  forEach(route);

  return list;
}
