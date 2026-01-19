import { request, INTERFACE_ACTIVITY } from '@/apis/request';
import type {
  ISaleActivityDetail, ISaleActivityDetailReqParams, ISaleActivityListReqParams, TSaleActivityListRes,
} from './types';

/* 查询活动列表 */
export const querySaleActivityList = (data: ISaleActivityListReqParams) => request<TSaleActivityListRes>({
  url: `${INTERFACE_ACTIVITY}/salesManageActivity/pageActivityList`,
  method: 'post',
  data,
});

/* 查询活动详情 */
export const querySaleActivityDetail = (data: ISaleActivityDetailReqParams) => request<ISaleActivityDetail>({
  url: `${INTERFACE_ACTIVITY}/salesManageActivity/activityDetail`,
  method: 'post',
  data,
});

/* 新增修改活动 */
export const postSaveOrUpdateSaleActivity = (data: ISaleActivityDetail) => request<boolean>({
  url: `${INTERFACE_ACTIVITY}/salesManageActivity/saveOrUpdate`,
  method: 'post',
  data,
});

/* 上线活动 */
export const onlineSaleActivity = (data: ISaleActivityDetailReqParams) => request<boolean>({
  url: `${INTERFACE_ACTIVITY}/salesManageActivity/up`,
  method: 'post',
  data,
});

/* 下线活动 */
export const offlineSaleActivity = (data: ISaleActivityDetailReqParams) => request<boolean>({
  url: `${INTERFACE_ACTIVITY}/salesManageActivity/stop`,
  method: 'post',
  data,
});

/* 删除活动 */
export const deleteSaleActivity = (data: ISaleActivityDetailReqParams) => request<boolean>({
  url: `${INTERFACE_ACTIVITY}/salesManageActivity/delete`,
  method: 'post',
  data,
});
