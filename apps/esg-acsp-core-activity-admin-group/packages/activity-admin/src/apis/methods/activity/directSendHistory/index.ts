import { request } from '@/apis/request';
import type {
  IReqQueryDirectSendHistoryList,
  IResQueryDirectSendHistoryList,
  TResQueryDeptListRes,
  IReqQueryDeptListParams,
} from './types';

const BASE_PREFIX = '/activity-web-backend/im-activity/web';

export const queryDirectSendHistoryList = (data: IReqQueryDirectSendHistoryList) => request<IResQueryDirectSendHistoryList>({
  url: `${BASE_PREFIX}/coupon/equityrecord/list`,
  data,
  method: 'post',
});

/** 根据网点名称查询网点数据 */
export const queryDeptListByName = (data: IReqQueryDeptListParams) => request<TResQueryDeptListRes>({
  url: `${BASE_PREFIX}/coupon/equityrecord/selectValidRange`,
  data,
  method: 'post',
});
