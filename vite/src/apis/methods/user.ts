import { request } from '../request';
import type {UserInfo} from "@/stores/modules/user/types";

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request<UserInfo>({
    url: '/web/user/info',
    method: 'get',
  });
};
