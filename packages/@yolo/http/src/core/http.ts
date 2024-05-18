import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { genUnionKey } from './utils';
import Dispatch from './dispatch';
import abortManagement from './abort';

export type RequestConfig = AxiosRequestConfig & {
  requestID?: string; // 请求的唯一ID，可用来取消请求
  cache?: boolean; // 是否缓存
  cacheTime?: number; // 缓存时长
  retryTimes?: number; // 重试次数
}

export const DefaultConfig = {
  cache: false,
  cacheTime: 60000,
  retryTimes: 0,
}

export class Http {
  axiosInstance: AxiosInstance;
  config: RequestConfig;
  dispatch = new Dispatch<Promise<AxiosResponse<any, any>>>(200, 10);

  constructor(config: RequestConfig = {}) {
    this.config = {
      ...DefaultConfig,
      ...config,
    };
    
    this.axiosInstance = axios.create(config);
  }

  setRequestInterceptor(
    onFulfilled: ((value: RequestConfig) => RequestConfig | Promise<RequestConfig> | any),
    onRejected?: ((error: any) => any)) {
    this.axiosInstance.interceptors.request.use(onFulfilled, onRejected);
  }
  setResponseInterceptor(
    onFulfilled: ((value: AxiosResponse<unknown, any>) => any),
    onRejected?: ((error: any) => any)
  ) {
    this.axiosInstance.interceptors.response.use(onFulfilled, onRejected);
  }

  async request<ResponseDataType = any, RequestDataType = any>(requestConfig: RequestConfig): Promise<AxiosResponse<ResponseDataType, RequestDataType>> {
    const params = requestConfig.method?.toLocaleLowerCase() === 'get' ? requestConfig.params : requestConfig.data;
    const key = genUnionKey(requestConfig.url, requestConfig.method, params || {}, requestConfig.retryTimes || 0);

    // const cache = storage.getItemSync(key, { type: 'session' })
    // if (cache && requestConfig.cache) {
    //   return Promise.resolve(cache)
    // }

    // 自定义配置部分需要支持全局配置，因此采用合并配置的方式
    const config = {
      ...this.config,
      ...requestConfig
    }

    if (config.requestID && window.AbortController) {
      const controller = new AbortController();
      config.signal = controller.signal;
      abortManagement.addController(config.requestID, controller);
    }

    try {
      const result = await this.dispatch.runTask(key, () => this.axiosInstance.request<ResponseDataType>(config));

      // if (requestConfig.cache) {
      //   storage.setItemSync(key, result, {
      //     type: 'session',
      //     expire: Date.now() + (config.cacheTime || DefaultConfig.cacheTime)
      //   })
      // }
      return result;
    } catch (e) {
      // 只有网络异常才会重试
      if (!e.response && requestConfig.retryTimes && requestConfig.retryTimes > 0) {
        return this.request({
          ...config,
          retryTimes: --requestConfig.retryTimes
        })
      } else {
        throw e; // 不需要重试的就抛出去
      }
    }
  }

  get<ResponseDataType = any, RequestDataType = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<ResponseDataType, RequestDataType>> {
    return this.request({
      ...config,
      url,
      method: 'get',
    })
  }
  post<ResponseDataType = any, RequestDataType = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<ResponseDataType, RequestDataType>> {
    return this.request({
      ...config,
      url,
      method: 'post',
      data,
    })
  }
  delete<ResponseDataType = any, RequestDataType = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<ResponseDataType, RequestDataType>> {
    return this.request({
      ...config,
      url,
      method: 'delete',
    })
  }
  put<ResponseDataType = any, RequestDataType = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<ResponseDataType, RequestDataType>> {
    return this.request({
      ...config,
      url,
      method: 'put',
      data,
    })
  }
  patch<ResponseDataType = any, RequestDataType = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<ResponseDataType, RequestDataType>> {
    return this.request({
      ...config,
      url,
      method: 'patch',
      data,
    })
  }
  head<ResponseDataType = any, RequestDataType = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<ResponseDataType, RequestDataType>> {
    return this.axiosInstance.head(url, config);
  }
  options<ResponseDataType = any, RequestDataType = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<ResponseDataType, RequestDataType>> {
    return this.axiosInstance.options(url, config);
  }

  download<ResponseDataType = any, RequestDataType = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<ResponseDataType, RequestDataType>> | void {
    return this.axiosInstance.get(url, {
      responseType: 'blob',
      ...(config || {}),
    });
  }
  upload<ResponseDataType = any, RequestDataType = any>(url: string, formData: FormData, config?: RequestConfig): Promise<AxiosResponse<ResponseDataType, RequestDataType>> | void {
    const header = (config && config.headers) ? config.headers : {}
    return this.axiosInstance.post(url, formData, {
      ...(config || {}),
      headers: {
        'Content-Type': 'multipart/form-data',
        ...header,
      },
    });
  }

  abort(requestID: string): void {
    abortManagement.abort(requestID);
  }
}