import { request } from '@/apis/request';
import type {
  IQueryRangeParams,
  IQueryRangeResItem,
  IQueryStaffResItem,
  ITransferParams,
  TQueryOperationDetailRes,
  IQueryOperationDetailParam,
  IQueryClueParams,
  TQueryClueRes,
  IQueryDictParams,
  IQueryDictRes,
} from './types';

const INTERFACE_ACTIVITY = '/activity-web-backend/im-activity/web';
const INTERFACE_REWARD = '/activity-web-backend/pmp-reward/web';

/**
 * 查询客户范围
 */
export const queryRange = (data: IQueryRangeParams) => request<IQueryRangeResItem[]>({
  url: `${INTERFACE_ACTIVITY}/staff/relation/queryRange`,
  method: 'post',
  data,
});

/* 查询待划转的小哥 */
export const queryStaff = (data: string) => request<IQueryStaffResItem[]>({
  url: `${INTERFACE_ACTIVITY}/staff/relation/queryStaff/${data}`,
  method: 'get',
});

/* 划转 */
export const transferEmp = (data: ITransferParams) => request({
  url: `${INTERFACE_ACTIVITY}/staff/promotion/update`,
  method: 'post',
  data,
});

/* 查询划转详情 */
export const operationDetail = (data: IQueryOperationDetailParam) => request<TQueryOperationDetailRes>({
  url: `${INTERFACE_REWARD}/operation/promotion/changeOperationDetail`,
  method: 'post',
  data,
});

/* 查询线索列表 */
export const queryClueList = (data: IQueryClueParams) => request<TQueryClueRes>({
  url: `${INTERFACE_ACTIVITY}/staff/promotion/search`,
  method: 'post',
  data,
});

/* 查询状态字典 */
export const queryDict = (data: IQueryDictParams) => request<IQueryDictRes>({
  url: `${INTERFACE_ACTIVITY}/dict/queryList`,
  method: 'post',
  data,
});
