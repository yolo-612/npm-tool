import { request } from '@/apis/request';
import type {
  IReqApplySendActivitySaveOrUpdate,
  IResApplySendActivitySaveOrUpdate,
  IReqApplySendActivityDetail,
  IResApplySendActivityQuery,
  IReqApplySendActivityList,
  TResApplySendActivityList,
  IReqApplySendActivityDelete,
  IResApplySendActivityDelete,
  IResApplySendActivityOnline,
  IReqApplySendActivityOnline,
  IReqApplySendActivityOffline,
  IResApplySendActivityOffline,
} from './types';

const INTERFACE_ACTIVITY = '/activity-web-backend/im-activity/web';

/* 新增或修改发券活动模板 */
export const saveOrUpdateCouponTemplate = (data: IReqApplySendActivitySaveOrUpdate) => request<IResApplySendActivitySaveOrUpdate>({
  url: `${INTERFACE_ACTIVITY}/coupon/template/saveOrUpdate`,
  method: 'post',
  data,
});

/* 发券活动模板详情 */
export const queryCouponTemplateDetail = (data: IReqApplySendActivityDetail) => request<IResApplySendActivityQuery>({
  url: `${INTERFACE_ACTIVITY}/coupon/template/getDetail`,
  method: 'post',
  data,
});

/* 查询申请发券列表 */
export const queryApplySendActivityList = (data: IReqApplySendActivityList) => request<TResApplySendActivityList>({
  url: `${INTERFACE_ACTIVITY}/coupon/templateList`,
  method: 'post',
  data,
});

/* 删除申请发券活动 */
export const deleteApplySendActivity = (data: IReqApplySendActivityDelete) => request<IResApplySendActivityDelete>({
  url: `${INTERFACE_ACTIVITY}/coupon/templateDelete`,
  data,
  method: 'post',
});

/* 上线申请发券活动 */
export const onlineApplySendActivity = (data: IReqApplySendActivityOnline) => request<IResApplySendActivityOnline>({
  url: `${INTERFACE_ACTIVITY}/coupon/templateOnline`,
  data,
  method: 'post',
});

/* 结束申请发券活动 */
export const offlineApplySendActivity = (data: IReqApplySendActivityOffline) => request<IResApplySendActivityOffline>({
  url: `${INTERFACE_ACTIVITY}/coupon/templateEnd`,
  data,
  method: 'post',
});
