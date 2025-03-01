import 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import type { BreadcrumbItem } from '@/types';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string; // 导航、面包屑导航以及页面中展示的标题
    icon?: string; // 菜单icon
    permission?: (string | RegExp)[]; // 路由权限，不配置代表有权限
    hideInMenu?: boolean; // 是否在左侧菜单中隐藏该项
    activeMenu?: string; // 激活的菜单
    order?: number; // 菜单排序，值越高，越靠前
    ignoreCache?: boolean; // 如果设置为true页面将不会被缓存
    noAffix?: boolean; // 如果设置为true，标签将不会添加到tab-bar中
    hideBreadcrumb?: boolean; // 是否在面包屑中隐藏该项
    isLink?: boolean; // 是否外部链接
    __parent__?: RouteRecordRaw; // 父路由
    _breadcrumbList?: BreadcrumbItem[]; // 面包屑导航列表
  }
}
