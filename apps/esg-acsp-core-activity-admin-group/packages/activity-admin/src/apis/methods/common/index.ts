import { INTERFACE_ACTIVITY, request } from '@/apis/request';
import type {
  IReqQueryCoupon, IResQueryCoupon, IDownloadFileParam, IResSendProductType,
} from './types';

const BASE_PREFIX = '/activity-web-backend/im-activity/web';
const REWARD_PREFIX = '/activity-web-backend/pmp-reward/web';
const STORE_PREFIX = '/activity-web-backend/pmp-store/web';

/** 上传地址 */
export const UPLOAD_URL = `${INTERFACE_ACTIVITY}/activity/upload`;

/** 上传文件 */
export const UPLOAD_FILE_URL = `${INTERFACE_ACTIVITY}/ossCommon/pmp/upload`;

/** 查询权益 */
export const queryCoupon = (data: IReqQueryCoupon) => request<IResQueryCoupon>({ url: `${BASE_PREFIX}/activity/queryCoupon`, data, method: 'post' });

/* 异步下载文件 */
export const asyncDownloadFile = <T>(data: IDownloadFileParam<T>) => request<boolean>({
  url: `${REWARD_PREFIX}/download/create`,
  data,
  method: 'post',
});

/** 查询产品类型-二级 */
export const getSendProductType = () => request<IResSendProductType>({
  url: `${BASE_PREFIX}/sendProductType`,
  method: 'get',
});

/** 查询产品类型-三级 */
export const getThreeLevelSendProductType = () => request<IResSendProductType>({
  url: `${STORE_PREFIX}/product/productTypeList`,
  method: 'post',
  data: {},
});

/** 查询全国城市 */
export const getAreaData = () => request<IResSendProductType>({
  url: `${BASE_PREFIX}/flow/direction/tree`,
  method: 'post',
  data: {},
});
