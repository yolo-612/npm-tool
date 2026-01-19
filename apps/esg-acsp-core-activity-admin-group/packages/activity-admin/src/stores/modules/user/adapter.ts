import { union } from 'lodash-es';
import type { RoleItem } from './types';
import { queryMenus, queryRoles, queryMenuBtn } from '@/apis/methods/basp';
import { BASP_SUB_SYSTEM_CODE } from '@/modules/sf-basp';
import forEachDeep from '@/utils/function/forEachDeep';
import type { BaspModule } from '@/modules/sf-basp/types';

/**
 * 多角色虚拟code
 */
export const ROLE_MULTI_CODE = 'role_multi_code';

/**
 * 多角色虚拟item
 */
export const getMultiRoleItem = (): RoleItem => {
  return {
    roleId: ROLE_MULTI_CODE,
    roleCode: ROLE_MULTI_CODE, // 角色编码
    roleName: '多角色',
    permissions: [],
  };
};

/**
 * 获取角色数据
 */
export const getRolesData = async (): Promise<RoleItem[]> => {
  let roles: RoleItem[] = [];
  try {
    const res = await queryRoles();
    if (res.success) {
      roles = res.obj.reduce((pre, item): any => {
        const {
          roleId, roleName, roleCode, subsysCode,
        } = item || {};
        /* 只需要活动子系统的角色和权限 */
        const isExist = BASP_SUB_SYSTEM_CODE.includes(subsysCode);
        return isExist ? [...pre, {
          roleId, roleName, roleCode, permissions: [], baspRoleMenus: [],
        }] : pre;
      }, []);
    }
  } catch (e) {
    console.error(e);
  }

  return roles;
};

/**
 * 获取角色的百源菜单数据
 */
export const getPermissionMenuData = async (roleItem: RoleItem): Promise<[string[], BaspModule[]]> => {
  const { success, obj } = await queryMenus(roleItem.roleId!);
  const permissions: string[] = [];
  // const moduleIds: any[] = [];
  if (success) {
    // 合并打平权限结构
    forEachDeep(
      obj,
      ({ moduleCode, moduleId, hidden }) => {
        if (hidden === 'Y') {
          return true;
        }
        if (!permissions.includes(moduleCode)) {
          permissions.push(moduleCode);
          // moduleIds.push(moduleId);
        }
      },
      'childModules',
    );
  }
  /* 拉取菜单对应的按钮 */
  // const menuBtnRes = await Promise.all(
  //   moduleIds.map((moduleId) => {
  //     return getPermissionBtnData(roleItem.roleId, moduleId);
  //   }),
  // );
  // const menuBtnList = menuBtnRes.reduce((pre: string[], cur) => (cur?.length ? [...pre, ...cur] : pre), []);
  // permissions.push(...menuBtnList);

  return [permissions, obj];
};

/* 获取百源菜单的按钮数据 */
export const getPermissionBtnData = async (roleId: string, menuId: number) => {
  const { success, obj } = await queryMenuBtn(roleId, menuId);
  if (success) return obj || [];
};

/**
 * 获取角色权限数据
 */
export const getRolePermissionData = async (): Promise<RoleItem[]> => {
  const roleData = await getRolesData();
  if (roleData.length === 0) {
    return roleData;
  }

  // 根据角色获取百源权限
  await Promise.all(
    roleData
      .filter((roleItem) => roleItem.roleCode !== ROLE_MULTI_CODE)
      .map((roleItem) => {
        return (async () => {
          const [permissions, baspRoleMenus] = await getPermissionMenuData(roleItem);
          roleItem.permissions = permissions;
          roleItem.baspRoleMenus = baspRoleMenus;
        })();
      }),
  );

  // if (roleData.length > 1) {
  //   // 多个角色时添加多角色数据
  //   const permissionsDataMulti = getMultiRoleItem();
  //   // 多角色包含所有此用户所有权限
  //   permissionsDataMulti.permissions = union(...Object.values(roleData.map((item) => item.permissions)));
  //   roleData.unshift(permissionsDataMulti);
  // }

  return roleData;
};

export const getUserRoleCode = (code: string) => `${code}_ROLE_CODE`;

/* 获取跳转的默认角色数据 */
export const getDefaultRoleCode = (username: string, roleDataList: RoleItem[]) => {
  /* 获取跳转的默认角色数据 */
  const storeKey = getUserRoleCode(username);
  try {
    const storageCode = localStorage.getItem(storeKey) || '';
    /* 获取跳转的默认角色数据 */
    const isStoreCodeExist = roleDataList.find((item) => item.roleCode === storageCode);
    return isStoreCodeExist ? storageCode : roleDataList[0].roleCode;
  } catch (e) {
    return roleDataList[0].roleCode;
  }
};
