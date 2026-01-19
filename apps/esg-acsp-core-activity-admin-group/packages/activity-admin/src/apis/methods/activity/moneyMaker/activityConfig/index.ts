import { request, INTERFACE_ACTIVITY } from '@/apis/request';
import type {
  IQueryActivityDetailParams,
  IQuotaRaisingDragonDetailParams,
  IRaisingDragonActivityListReqParams,
  IRaisingDragonActivityListRes,
  IRaisingDragonActivityReqParams,
} from './type';

/* 查询活动列表 */
export const queryDragonActivityList = (data: IRaisingDragonActivityListReqParams) => request<IRaisingDragonActivityListRes>({
  url: `${INTERFACE_ACTIVITY}/dragon/pageDragonActivityList`,
  method: 'post',
  data,
});

/* 上线活动 */
export const onlineDragonActivity = (data: IRaisingDragonActivityReqParams) => request<boolean>({
  url: `${INTERFACE_ACTIVITY}/dragon/updateStatusUp`,
  method: 'post',
  data,
});

/* 下线活动 */
export const offlineDragonActivity = (data: IRaisingDragonActivityReqParams) => request<boolean>({
  url: `${INTERFACE_ACTIVITY}/dragon/updateStatusOff`,
  method: 'post',
  data,
});

/* 删除活动 */
export const deleteDragonActivity = (data: IRaisingDragonActivityReqParams) => request<boolean>({
  url: `${INTERFACE_ACTIVITY}/dragon/delete`,
  method: 'post',
  data,
});

/**
 * 活动配置详情
 */
export const queryDragonActivityDetail = (data: IQueryActivityDetailParams) => request<IQuotaRaisingDragonDetailParams>({
  url: `${INTERFACE_ACTIVITY}/dragon/dragonActivityDetail`,
  method: 'post',
  data,
});

/**
 * 活动配置保存/更新
 * @param data ISaveDragonDetailParams
 * @returns
 */
export const saveDragonActivityInfo = (data: IQuotaRaisingDragonDetailParams) => request({
  url: `${INTERFACE_ACTIVITY}/dragon/saveDragonActivity`,
  method: 'post',
  data,
});
