import { request } from '../request';

export interface UserInfo {
  username: string;
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request<UserInfo>({
    url: '/activity-web-backend/user/info',
    method: 'get',
  });
};
