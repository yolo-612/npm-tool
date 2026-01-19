import type { RouteRecordRaw } from 'vue-router';
import type { DefineComponent } from 'vue';
import type { BaspModule } from '@/modules/sf-basp/types';

/**
 * 菜单类型
 */
export interface MenuItem {
  path: string; // 菜单路径
  title: string; // 菜单标题
  icon?: DefineComponent | string; // 菜单图标
  children?: MenuItem[]; // 子菜单
  order?: number; // 菜单排序
  isLink?: boolean; // 是否外链
  /** 是否内嵌 */
  isEmbedded?: boolean;
  /** 内嵌地址 */
  embeddedUrl?: string;
  permission?: (string | RegExp)[]; // 路由权限，不配置代表有权限
}

/** 顶部菜单类型 */
export type HeaderMenuItem = MenuItem & {
  /** 跳转地址 */
  jumpUrl?: string;
};

/**
 * 获取菜单数适配器
 */
export type MenuTreeAdapter = (routes: readonly RouteRecordRaw[] | undefined, roleCode?:string, baspRoleMenus?: BaspModule[]) => Promise<MenuItem[]>;

/** 百源自定义菜单类型 */
export interface BaspCustomizeData {
  /** 模块类型，内嵌则为 embedded */
  type: string;
  /** 内嵌跳转地址 */
  embeddedUrl: string;
  /** 是否隐藏菜单 */
  hideMenu: string;
}
