import type { RouteRecordRaw } from 'vue-router';

/**
 * 菜单类型
 */
export interface MenuItem {
  path: string; // 菜单路径
  title: string; // 菜单标题
  icon?: string; // 菜单图标
  children?: MenuItem[]; // 子菜单
  order?: number; // 菜单排序
  isLink?: boolean; // 是否外链
  permission?: (string | RegExp)[]; // 路由权限，不配置代表有权限
}

/**
 * 获取菜单数适配器
 */
export type MenuTreeAdapter = (routes: readonly RouteRecordRaw[] | undefined, roleCode?:string) => Promise<MenuItem[]>;
