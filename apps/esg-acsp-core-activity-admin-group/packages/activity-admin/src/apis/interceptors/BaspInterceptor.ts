// 百源拦截器
import type { AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { getEmpCode } from '@/utils/auth';
import type { HttpResponse } from '@/apis/request';
import type { BaspHttpResponse } from '@/modules/sf-basp/types';

const isBaspUrl = (url: string | undefined) => {
  return url?.indexOf('/dev-basp-user/') !== -1;
};

export default {
  // 请求拦截器
  request: [
    (config: InternalAxiosRequestConfig) => {
      // 百源接口请求头需要设置userId
      if (isBaspUrl(config.url)) {
        const empCode = getEmpCode();
        if (empCode) {
          if (!config.headers) {
            // eslint-disable-next-line no-param-reassign
            config.headers = {} as AxiosHeaders;
          }
          // eslint-disable-next-line no-param-reassign
          config.headers['userId'] = empCode;
        }
      }
      return config;
    },
  ],
  // 响应拦截器
  response: [
    (response: AxiosResponse<HttpResponse>) => {
      if (isBaspUrl(response.config.url)) {
        // 响应拦截，转换百源响应格式
        const data = response.data as unknown as BaspHttpResponse;
        response.data = {
          success: data.succ === 'ok',
          obj: data.result,
          errorMessage: data.msg,
          errorCode: '',
        };
      }
      return response;
    },
  ],
};
