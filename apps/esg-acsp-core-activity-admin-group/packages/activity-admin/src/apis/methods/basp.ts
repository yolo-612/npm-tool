import { request } from '../request';
import type { BaspModule, BaspRole } from '@/modules/sf-basp/types';

/**
 * 查询当前用户百源角色
 */
export const queryRoles = () => {
  return request<BaspRole[]>({
    url: '/dev-basp-user/indexModule/queryRoles',
    method: 'get',
  });
};

/**
 * 根据角色查询用户功能菜单权限
 * @param roleId 角色id
 */
export const queryMenus = (roleId: string) => {
  return request<BaspModule[]>({
    url: '/dev-basp-user/indexModule/queryMenus',
    method: 'get',
    params: { roleId },
  });
};

/**
 * 根据角色查询用户菜单数据
 */
export const queryMenusTree = () => {
  return request<BaspModule[]>({
    url: '/dev-basp-user/indexModule/queryMenusTree',
    method: 'get',
  });
};

/* 根据菜单查询菜单的按钮数据 */
export const queryMenuBtn = (roleId: string, moduleId: number) => {
  return request<string[]>({
    url: '/dev-basp-user/indexModule/queryBtns',
    method: 'get',
    params: { moduleId, roleId },
  });
};