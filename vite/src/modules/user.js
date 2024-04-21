import {reactive} from "vue";
// import http from '@fpkg/http';
import { getUserInfo } from "@/apis/api.js";

class User{
  userInfo = reactive({
    isInited:false,//是否执行过初始化逻辑，init方法执行完设置为true
    isLogin:false, //是否登录
    userId:'',
  })

  _initPromise = null

  /**
   * 初始化，多次调用只会执行一次，永远会resolve，不会reject
   * @param refresh 强制刷新
   * @return {Promise<null>}
   */
  async init(refresh = false){
    if (this._initPromise && !refresh) {
      return this._initPromise
    }
    this._initPromise = new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve()
      },1000)
    })

    return this._initPromise
  }
  /**
   * @return {Promise<void>}
   * @private
   */
  async _getUserInfo() {
    // const {success,obj} = await http.request(getUserInfo())
    // if(success){
    //   Object.assign(this.userInfo,obj)
    // }
  }

  /**
   * todo 获取角色权限
   * @return {Promise<void>}
   * @private
   */
  async _getPermissionRules(){

  }
}



const user = new User()

export const appUser = user
/**
 * 用户信息，响应式对象
 */
export const appUserInfo = user.userInfo





