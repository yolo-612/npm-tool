import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { HttpResponse } from '@/apis/request';

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
      return response;
    },
    (error: any) => {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      return Promise.reject(error);
    },
  ],
};
