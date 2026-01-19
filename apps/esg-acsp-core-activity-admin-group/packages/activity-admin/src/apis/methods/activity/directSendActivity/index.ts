import { request } from '@/apis/request';
import type {
  IReqDirectSendActivityDetail,
  IResDirectSendActivityDetail,
  IReqDirectSendActivityList,
  IResDirectSendActivityList,
  IReqDirectSendActivitySaveOrUpdate,
  IResDirectSendActivitySaveOrUpdate,
  IReqDirectSendActivityDelete,
  IResDirectSendActivityDelete,
  IReqDirectSendActivityOffline,
  IReqDirectSendActivityOnline,
  IResDirectSendActivityOnline,
  IResDirectSendActivityOffline,
} from './types';

const BASE_PREFIX = '/activity-web-backend/im-activity/web';

export const queryDirectSendActivityList = (data: IReqDirectSendActivityList) => request<IResDirectSendActivityList>({
  url: `${BASE_PREFIX}/coupon/list`,
  data,
  method: 'post',
});

export const queryDirectSendActivityDetail = (data: IReqDirectSendActivityDetail) => request<IResDirectSendActivityDetail>({
  url: `${BASE_PREFIX}/coupon/getDetail`,
  data,
  method: 'post',
});

export const saveOrUpdateDirectSendActivityDetail = (data: IReqDirectSendActivitySaveOrUpdate) => request<IResDirectSendActivitySaveOrUpdate>({
  url: `${BASE_PREFIX}/coupon/saveOrUpdate`,
  data,
  method: 'post',
});

export const deleteDirectSendActivity = (data: IReqDirectSendActivityDelete) => request<IResDirectSendActivityDelete>({
  url: `${BASE_PREFIX}/coupon/delete`,
  data,
  method: 'post',
});

export const onlineDirectSendActivity = (data: IReqDirectSendActivityOnline) => request<IResDirectSendActivityOnline>({
  url: `${BASE_PREFIX}/coupon/up`,
  data,
  method: 'post',
});

export const offlineDirectSendActivity = (data: IReqDirectSendActivityOffline) => request<IResDirectSendActivityOffline>({
  url: `${BASE_PREFIX}/coupon/off`,
  data,
  method: 'post',
});
