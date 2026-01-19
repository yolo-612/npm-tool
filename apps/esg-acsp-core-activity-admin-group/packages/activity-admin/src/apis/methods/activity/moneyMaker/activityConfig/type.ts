import type { IPageParams, IResList } from '@/types';

/* 通用育龙活动详情请求参数 */
export interface IRaisingDragonActivityReqParams {
  /** 活动编码 */
  code: string;
}

/** 活动配置详情页参数 */
export interface IQueryActivityDetailParams {
  /** 活动编码 */
  code: string;
}

/* 通用育龙活动新增编辑 */
export interface IQuotaRaisingDragonDetailParams {
  /* 活动id */
  id?: string;
  /** 活动编码 */
  code?: string;
  /** 活动名称 */
  name: string;
  /** 活动开始时间 */
  startTime: string;
  /** 育龙开始时间（选龙结束时间） */
  cultivateStartTime: string;
  /** 活动结束时间 */
  endTime: string;
  /** 目标达成奖励提成比例 */
  targetRate?: number;
  /** 超出目标部分提成比例 */
  excessRate?: number;
  /** 补偿部分提成比例 */
  compensateRate?: number;
  /** 获取补偿下限百分比 */
  compensateIncome?: number;
  /** 活动类型，0：普通，1：大件 */
  model: number;
  /** 是否开启激励规则配置 */
  rewardType: boolean;
  /** 来搞钱活动文案 */
  activityDesc: string;
  /** 活动状态，0：未上线，1：已上线，2：已下线 */
  status?: string;
}

/**
 * 列表查询参数
 */
export interface IRaisingDragonActivityListReqParams extends IPageParams {
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
  startTimeEnd?: string,
  /** 活动时间-结束-起 */
  endTimeBegin?: string,
  /** 活动时间-结束-止 */
  endTimeEnd?: string,
}

/** 列表接口返回数据 */
export type IRaisingDragonActivityListRes = IResList<{
  /** 活动名称 */
  name: string;
  /** 活动编码 */
  code: string,
  /** 活动状态 */
  status: string,

  /** 创建人工号 */
  creator: string;

  /** 活动时间-开始 */
  startTime: string,
  /** 活动时间-结束 */
  endTime: string,

  /** 上线时间 */
  upTime: string,
}>;
