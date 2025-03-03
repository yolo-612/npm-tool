import { createCachePromise } from '@/utils';
import type { RoleItem, UserInfo } from './types';
import { mockUserInfo, mockRoleInfo, mockPermissionInfo } from '@/apis/mock'

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
   * @return {Promise<void>}
   * @private
   */
  const _getRolesData = async ()=>{
    const { success,obj } = await Promise.resolve(mockRoleInfo)
    if(!success || !obj) return []
    return obj 
  }  
  /**
   * 获取用户信息
   * @return {Promise<void>}
   * @private
   */
  const _getUserInfo = async ()=>{
    const { success,obj } = await Promise.resolve(mockUserInfo)
    if(success){
      userInfo.empCode = obj.empCode
      userInfo.isLogin = true
    }else{
      userInfo.isLogin = false
    }
    console.log(userInfo, 'userInfo====>')
  }

  /**
   * 获取权限信息
   * @return {Promise<void>}
   * @private
   */
  const _getRolePermissionData = async ()=>{
    const RoleData = await _getRolesData()
    
    await Promise.all(RoleData.map((role: RoleItem)=>{
      return (async ()=>{
        const { success, obj } = await Promise.resolve(mockPermissionInfo);
        const permissions: string[] = [];

        if(!success || !obj) return
        forEachDeepModules(obj, ({ moduleCode })=>{
          if(!permissions.includes(moduleCode)){
            permissions.push(moduleCode)
          }
        })
        role.permissions = permissions
      })()
    }))

    return { RoleData }
  }

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
        const { RoleData } = await _getRolePermissionData();
        console.log(RoleData, '===>角色+权限')
        userInfo.RoleData = RoleData
        if(RoleData.length>0){
          // 设置默认角色
          switchRole(RoleData[0].roleCode)
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
