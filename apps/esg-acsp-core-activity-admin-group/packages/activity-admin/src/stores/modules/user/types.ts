import type { BaspModule } from '@/modules/sf-basp/types';

export interface UserInfo {
  isLogin?: boolean; // 是否登录
  empCode: string; // 用户id，工号
  permissions: string[]; // 权限列表
  roles: string[]; // 当前角色code集合，多角色时有多个code
  roleCode: string; // 当前角色code
  roleName: string; // 当前角色名称
}

export interface RoleItem {
  /** 角色code */
  roleCode: string;
  /** 角色名称 */
  roleName: string;
  /** 角色id */
  roleId: string;
  /** 角色权限列表 */
  permissions: string[];
  /** 百源数据菜单权限 */
  baspRoleMenus: BaspModule[];
}
