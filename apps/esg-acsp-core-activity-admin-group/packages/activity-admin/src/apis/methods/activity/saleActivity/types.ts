import type { IPageParams, IResList } from '@/types';

export interface ISaleActivityListReqParams extends IPageParams {
  /** 活动名称 */
  name?: string;
  /** 活动编码 */
  code?: string,
  /** 活动状态 */
  status?: string,
  /** 创建人 */
  creator?: string,
  /** 活动时间-开始-起 */
  startTimeBegin?: string,
  /** 活动时间-开始止- */
  startTimeFinish?: string,
  /** 活动时间-结束-起 */
  endTimeBegin?: string,
  /** 活动时间-结束-止 */
  endTimeFinish?: string,
}

export type TSaleActivityListRes = IResList<{
  /** 活动名称 */
  name: string;
  /** 活动编码 */
  code: string,
  /** 活动状态 */
  status: string,
  /** 创建时间 */
  createTime: string;
  /** 创建人工号 */
  creator: string;

  /** 活动时间-开始 */
  startTime: string,
  /** 活动时间-结束 */
  endTime: string,

  /** 上线时间 */
  upTime: string,
}>;

/* 活动详情请求参数 */
export interface ISaleActivityDetailReqParams {
  /** 活动编码 */
  code: string;
}

/** 活动详情数据 */
export interface ISaleActivityDetail {
  /** 活动id */
  id?: number;
  /** 活动编号 */
  code?: string;
  /** 活动名称 */
  name: string;
  /** 活动时间范围-开始 */
  startTime: string;
  /** 活动时间范围-结束 */
  endTime: string;
  /**
   * 物料配置json
   * 包含精准营销海报 Url activityPosterUrl
   * 夺宝奇兵海报 Url DBQBPosterUrl
   * */
  materialJson?: string;
  /** 活动状态 */
  status?: string;
}
