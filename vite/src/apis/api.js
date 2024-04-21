/**
 * 获取用户信息
 * @return {{method: string, url: string}}
 */
export const getUserInfo = ()=>{
  return {
    url: '/bx-manage-srv/web/user/info',
    method: 'get',
  };
}
