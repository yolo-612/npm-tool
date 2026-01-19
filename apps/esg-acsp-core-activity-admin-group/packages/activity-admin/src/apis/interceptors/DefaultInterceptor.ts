import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from '@sdesign/element-plus';
import type { HttpResponse } from '@/apis/request';

let showNotLoginDialogFlag = false;

export default {
  // 请求拦截器
  request: [
    (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error: any) => {
      // do something
      return Promise.reject(error);
    },
  ],
  // 响应拦截器
  response: [
    (response: AxiosResponse<HttpResponse>) => {
      // 响应拦截
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      const data = response.data;

      if (data.errorCode === '401' && !showNotLoginDialogFlag) {
        // 登录态失效
        showNotLoginDialogFlag = true;
        // 弹出登录框
        ElMessage.warning('登录态失效，请重新登录！');

        setTimeout(() => {
          // @ts-ignore
          window.location.href = `${data.obj.urlToRedirectTo}?target=${window.location.href}`;
        }, 1000);
      }
      if (!data.success) {
        throw new Error(data.errorMessage);
      }
      return response;
    },
    (res: any) => {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      if (!res.response) {
        return {
          errorCode: 'NETWORK_ERROR',
          errorMessage: 'Network Error',
          success: false,
          response: res.response || null,
          obj: null,
        };
      }
      const errorMessage = res.response.data && res.response.data.errorMessage ? res.response.data.errorMessage : '';
      const status = res.response.status;
      return {
        errorCode: 'SERVER_ERROR',
        errorMessage: errorMessage || `Sever Error ${`${status}` ? `(${status})` : ''}`,
        success: false,
        response: res.response,
        obj: null,
      };
    },
  ],
};
