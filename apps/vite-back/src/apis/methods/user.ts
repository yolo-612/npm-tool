import { request } from '../request';
import type {UserInfo, RoleItem} from "@/stores/modules/user/types";

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request<UserInfo>({
    url: '/web/user/info',
    method: 'get',
  });
};

/**
 * 查询当前用户角色
 */
export const queryRoles = () => {
  return request<RoleItem[]>({
    url: '/web/query/roleInfo',
    method: 'post',
  });
};

/**
 * 查询当前用户角色对应的权限
 * @param roleId 角色id
 */
export const queryPermissionByRole = (roleId: string) => {
  return request<any>({
    url: '/web/query/permissionByRole',
    method: 'post',
    data: { roleId }
  });
};
