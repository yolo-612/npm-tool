import { createCachePromise } from '@/utils';
import type { RoleItem, UserInfo } from './types';
import { getUserInfo, queryRoles, queryPermissionByRole } from '@/apis/methods/user';

/**
 * **
 * 遍历所有子模块获取
 * @param modules
 * @param fn
 */
const forEachDeepModules = (modules: any[], fn: Function)=>{
  if(modules && modules.length>0){
    modules.forEach((item: any)=>{
      fn(item)
      forEachDeepModules(item.childModules, fn)
    })
  }
}  

const useUserStore = defineStore('user', () => {
  const userInfo = reactive<UserInfo>({
    isLogin: undefined, // 是否登录
    empCode: '', // 用户id，工号
    roleCode: '', // 当前角色code
    roleName: '无权限',
    roles: [], // 当前角色code集合，多角色时有多个code
    permissions: [], // 权限列表
    RoleData:[],
  });

  /**
   * 切换角色
   */
  const switchRole = (roleCode: string) => {
    const currentRoleObj = userInfo.RoleData.find((item: RoleItem)=>item.roleCode === roleCode)

    if(currentRoleObj){
      userInfo.permissions = currentRoleObj.permissions || []
      userInfo.roleName = currentRoleObj.roleName
      userInfo.roleCode = currentRoleObj.roleCode
      userInfo.roles = [roleCode] 
    }else{
      userInfo.permissions = []
      userInfo.roleName = '无权限'
      userInfo.roles = []
    }
  };

  /**
   * 获取角色信息
   * @return {Promise<RoleItem[]>}
   * @private
   */
  const _getRolesData = async ():Promise<RoleItem[]>=>{
    const { success, obj } : any = await queryRoles()
    if(!success || !obj) return []
    return obj
  }  
  /**
   * 获取用户信息
   * @return {Promise<void>}
   * @private
   */
  const _getUserInfo = async ()=>{
    const { success,obj } = await getUserInfo()
    if(success){
      userInfo.empCode = obj.empCode
      userInfo.isLogin = true
    }else{
      userInfo.isLogin = false
    }
    console.log(userInfo, 'userInfo====>')
  }

  /**
   * 根据传入的roleItem的code 获取权限信息
   * @return {Promise<void>}
   * @private
   */
  const _getPermissionData = async (roleItem: RoleItem):Promise<string[]>=>{
    const { success, obj } = await queryPermissionByRole(roleItem.roleId);
    const permissions: string[] = [];

    if(!success || !obj) return []
    forEachDeepModules(obj, ({ moduleCode })=>{
      if(!permissions.includes(moduleCode)){
        permissions.push(moduleCode)
      }
    })

    return permissions
  }

  /**
   * 获取角色权限数据
   */
  const _getRolePermissionData = async ():Promise<RoleItem[]> => {
    const roleData = await _getRolesData();
    if (roleData.length === 0) {
      return roleData;
    }

    // 根据角色获取权限
    await Promise.all(
      roleData
        .map((roleItem) => {
          return (async () => {
            roleItem.permissions = await _getPermissionData(roleItem);
          })();
        }),
    );

    return roleData;
  };

  /**
   * 初始化，多次调用只会执行一次，永远会resolve，不会reject
   * @param refresh 强制刷新
   * @return {Promise}
   */
  const initUser = createCachePromise(async () => {
    try {
      await _getUserInfo();
      if(userInfo.isLogin){
        // 有登录态时获取权限
        userInfo.RoleData = await _getRolePermissionData();
        console.log(userInfo.RoleData, '===>角色+权限')
        if(userInfo.RoleData.length>0){
          // 设置默认角色
          switchRole(userInfo.RoleData[0].roleCode)
        }
      }
    } catch (e) {
      console.error(e);
    }
  });

  return {
    ...toRefs(userInfo),
    initUser,
    switchRole,
  };
});

export default useUserStore;
