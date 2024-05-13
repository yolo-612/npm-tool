import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';
import { createCachePromise } from '@/utils/function';
import { mockUserInfo, mockRoleInfo, mockPermissionInfo } from '@/apis/mock'

/**
 * **
 * 遍历所有子模块获取
 * @param modules
 * @param fn
 */
export const forEachDeepModules = (modules, fn)=>{
  if(modules && modules.length>0){
    modules.forEach((item)=>{
      fn(item)
      forEachDeepModules(item.childModules, fn)
    })
  }
}

const useUserStore = defineStore('user', () => {
  const userInfo = reactive({
    isLogin: undefined, //是否登录
    empCode:'',// 用户id，工号
    permissions:[],// 权限列表
    roles:[], // 扩展后续支持多角色
    roleCode:'',// 当前角色code
    roleName:'无权限',
    PermissionsData:{},
    RoleData:[],
  })

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
   * 获取权限信息
   * @return {Promise<void>}
   * @private
   */
  const _getRolePermissionData = async ()=>{
    const PermissionsData = {}
    const RoleData = await _getRolesData()
    
    await Promise.all(RoleData.map(role=>{
      return (async ()=>{
        const { success, obj } = await Promise.resolve(mockPermissionInfo);
        const permissions = [];

        if(!success || !obj) return
        forEachDeepModules(obj, ({ moduleCode })=>{
          if(!permissions.includes(moduleCode)){
            permissions.push(moduleCode)
          }
        })
        PermissionsData[role.roleCode] = permissions
      })()
    }))

    return { RoleData, PermissionsData }
  }

  /**
   * 切换角色
   */
  const switchRole = (roleCode)=>{

    const currentRoleObj = userInfo.RoleData.find(item=>item.roleCode === roleCode)

    if(currentRoleObj){
      userInfo.permissions = userInfo.PermissionsData[roleCode] || []
      userInfo.roleName = currentRoleObj.roleName
      userInfo.roleCode = currentRoleObj.roleCode
      userInfo.roles = [roleCode] 
    }else{
      userInfo.permissions = []
      userInfo.roleName = '无权限'
      userInfo.roles = []
    }
  }

  /**
   * 初始化，多次调用只会执行一次，永远会resolve，不会reject
   * @param refresh 强制刷新
   * @return {Promise}
   */
  const initUser = createCachePromise(async ()=>{
    try {
      await _getUserInfo();
      if(userInfo.isLogin){
        // 有登录态时获取权限
        const { RoleData, PermissionsData } = await _getRolePermissionData();
        console.log(RoleData, PermissionsData, '===>角色+权限')
        userInfo.RoleData = RoleData
        userInfo.PermissionsData = PermissionsData
        if(RoleData.length>0){
          // 设置默认角色
          switchRole(RoleData[0].roleCode)
        }
      }
    } catch (e) {
      console.error(e);
    }
  })

  return {
    ...toRefs(userInfo),
    initUser,
    switchRole,
  }
})

export default useUserStore
