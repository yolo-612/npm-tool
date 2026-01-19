/* 小哥画像 */

import { request, INTERFACE_ACTIVITY } from '@/apis/request';
import type {
  IPostPortraitListParams,
  TPostPortraitListRes,
  IPostPortraitStatusParams,
  IPostPortraitDetailRes,
  IPostPortraitUpdateParams,
} from './types';

/* 查询画像列表 */
export const queryPortraitList = (data: IPostPortraitListParams) => request<TPostPortraitListRes>({
  url: `${INTERFACE_ACTIVITY}/coupon/portrait/getList`,
  method: 'post',
  data,
});

/* 画像开始 */
export const queryPortraitStart = (data: IPostPortraitStatusParams) => request<null>({
  url: `${INTERFACE_ACTIVITY}/coupon/portrait/start`,
  method: 'post',
  data,
});

/* 画像结束 */
export const queryPortraitEnd = (data: IPostPortraitStatusParams) => request<null>({
  url: `${INTERFACE_ACTIVITY}/coupon/portrait/end`,
  method: 'post',
  data,
});

/* 查询画像详情 */
export const queryPortraitDetail = (data: IPostPortraitStatusParams) => request<IPostPortraitDetailRes>({
  url: `${INTERFACE_ACTIVITY}/coupon/portrait/getDetail`,
  method: 'post',
  data,
});

/* 更新画像 */
export const postSaveOrUpdatePortrait = (data: IPostPortraitUpdateParams) => request<boolean>({
  url: `${INTERFACE_ACTIVITY}/coupon/portrait/saveOrUpdate`,
  method: 'post',
  data,
});

/* 导入小哥画像 */
export const postImportPortrait = (data: FormData) => request<string>({
  url: `${INTERFACE_ACTIVITY}/coupon/portrait/import`,
  method: 'post',
  data,
});
export const IMPORT_PORTRAIT_URL = `${INTERFACE_ACTIVITY}/coupon/portrait/import`;
