import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';
import { createCachePromise } from '@/utils/function';

const useUserStore = defineStore('user', () => {
  const userInfo = reactive({
    isLogin: undefined, //是否登录
    empCode:'',// 用户id，工号
    permissions:[],// 权限列表
    roles:[],
    roleCode:'',// 当前角色code
    roleName:'无权限',
  })

  /**
   * 获取用户信息
   * @return {Promise<void>}
   * @private
   */
  const _getUserInfo = async ()=>{
    const { success,obj } = await Promise.resolve({
      success: true,
      obj: {
        empCode: 'yolo',
      }
    })
    if(success){
      userInfo.empCode = obj.empCode
      userInfo.isLogin = true
    }else{
      userInfo.isLogin = false
    }
    console.log(userInfo, '-====>')
  }

  /**
   * 切换角色
   */
  const switchRole = (roleCode)=>{

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
