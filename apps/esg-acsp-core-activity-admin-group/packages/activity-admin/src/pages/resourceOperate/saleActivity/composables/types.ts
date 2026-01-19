import type { ISaleActivityDetail } from '@/apis/methods/activity/saleActivity/types';

/* 去到详情页的操作类型 */
export enum PAGE_ACTION {
  ADD = 'add',
  DETAIL = 'detail',
  EDIT = 'edit',
  COPY = 'copy'
}

/** 活动表单数据 */
export interface ISaleActivityFormData extends Pick<ISaleActivityDetail, 'id' | 'code' | 'name' | 'startTime' | 'endTime'> {
  /** 精准营销海报 Url */
  activityPosterUrl?: string;
  /** 夺宝奇兵海报 Url */
  DBQBPosterUrl?: string;
}
