import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import DefaultInterceptor from '@/apis/interceptors/DefaultInterceptor';

/**
 * 后端接口响应格式
 */
export interface HttpResponse<T = unknown> {
  success: boolean;
  obj: T;
  errorCode: string;
  errorMessage: string;
}

const axiosInstance = axios.create({
  timeout: 1000 * 60,
  responseType: 'json',
});

if (import.meta.env.VITE_API_BASE_URL) {
  axiosInstance.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

// 请求拦截器
axiosInstance.interceptors.request.use(...DefaultInterceptor.request);

// 响应拦截器
axiosInstance.interceptors.response.use(...DefaultInterceptor.response);

// 封装axios请求，充分利用类型检查与提示
const request = async <T = any>(config: AxiosRequestConfig): Promise<HttpResponse<T>> => {
  const { data } = await axiosInstance.request<HttpResponse<T>>(config);
  return data;
};

export { request, axiosInstance };
