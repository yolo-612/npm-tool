import { setCesHeaders } from 'ces-gift-web/shared';
import { getUserInfo } from '@/apis/methods/user';
import { createCachePromise } from '@/utils';
import { setEmpCode } from '@/utils/auth';
import type { RoleItem, UserInfo } from './types';
import {
  getRolePermissionData, ROLE_MULTI_CODE, getDefaultRoleCode, getUserRoleCode,
} from './adapter';
import { setHeaders } from '@/apis/request';

const useUserStore = defineStore('user', () => {
  const userInfo = reactive<UserInfo>({
    isLogin: undefined, // 是否登录
    empCode: '', // 用户id，工号
    roleCode: '', // 当前角色code
    roleName: '无权限',
    roles: [], // 当前角色code集合，多角色时有多个code
    permissions: [], // 权限列表
  });

  // 角色权限数据
  const roleData = ref<RoleItem[]>([]);

  /**
   * 切换角色
   */
  const switchRole = (roleCode: string) => {
    setHeaders('Role-Code', roleCode);
    /** 权益组件中的接口请求必须添加Headers */
    setCesHeaders('Role-Code', roleCode);
    const currentRoleObj = roleData.value.find((item) => item.roleCode === roleCode);
    if (!currentRoleObj) {
      userInfo.permissions = [];
      userInfo.roleName = '无权限';
      userInfo.roles = [];
      return;
    }

    userInfo.permissions = currentRoleObj.permissions;
    userInfo.roleName = currentRoleObj.roleName;
    userInfo.roleCode = currentRoleObj.roleCode;
    userInfo.roles = roleData.value
      .filter((item) => {
        if (roleCode === ROLE_MULTI_CODE) {
          return item.roleCode !== ROLE_MULTI_CODE;
        }
        return roleCode === item.roleCode;
      })
      .map((item) => item.roleCode);
    const storeKey = getUserRoleCode(userInfo.empCode);
    try {
      window.localStorage.setItem(storeKey, roleCode);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 初始化，多次调用只会执行一次，永远会resolve，不会reject
   * @param refresh 强制刷新
   * @return {Promise}
   */
  const initUser = createCachePromise(async () => {
    try {
      const { success, obj } = await getUserInfo();
      if (!success) {
        // 没有
        userInfo.isLogin = false;
        return;
      }
      userInfo.isLogin = true;
      userInfo.empCode = obj.username;

      setEmpCode(userInfo.empCode);
      // 有登录态时获取权限
      roleData.value = await getRolePermissionData();
      if (roleData.value.length > 0) {
        // 设置默认角色
        const defaultCode = getDefaultRoleCode(obj.username, roleData.value);
        switchRole(defaultCode);
      }
    } catch (e) {
      console.error(e);
    }
  });

  return {
    ...toRefs(userInfo),
    roleData,
    initUser,
    switchRole,
  };
});

export default useUserStore;
