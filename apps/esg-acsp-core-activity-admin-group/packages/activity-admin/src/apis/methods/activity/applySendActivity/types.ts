import type { IResList, IPageParams } from '@/types';

export interface ICityFlowDirectionBase {
  sourceDistCode: string[];
  targetDistCode: string[];
}

/* 城市流向 */
export interface ICityFlowDirection extends ICityFlowDirectionBase {
  [key: string]: string[];
}

export interface IConfigEquityData {
  /** 权益名称 */
  equityName: string;
  /** 权益编码 */
  equityCode: string;
  /** 折扣率/金额 */
  discountValue: string;
  /** 权益数量 */
  equityCount: string;
  /** 权益开始时间 */
  equityStartTime: string;
  /** 权益结束时间 */
  equityEndTime: string;
  /** 小哥画像编码 */
  staffGroupCode: string | undefined;
  /** 发放次数 */
  equityPkgCount?: number;
}

export interface IReqApplySendActivitySaveOrUpdate {
  /** 发券活动名称 */
  name: string;
  /** 发券活动编码 */
  code?: string;
  /** 活动开始时间 */
  startTime: string;
  /** 活动结束时间 */
  endTime: string;
  /** 发券客户层级 */
  customerLayer: string;
  /** 发券客户范围，RELATION：小哥绑定客户，DEPT：小哥负责区域客户，CUSTOMER：指定客户 */
  customerGroupType: string;
  /* 活动优先级 */
  weight: number | null;
  /** 小哥画像 */
  staffGroupCode?: string;
  /** 权益开始类型 */
  equityStartType: string;
  /** 权益生效日期 */
  equityStartTime: string;
  /** 权益结束类型 */
  equityEndType: string;
  /** 权益失效日期 */
  equityEndTime: string;
  /** 权益自生效后的生效天数 */
  equityEndDay: string | null;
  /** 周期规则 */
  rangeRule: number[];
  /** 寄件产品类型列表 */
  sendProductType: string[];
  /** 重量范围 */
  weightRange: number[];
  /** 券类型 */
  equityType: string;
  /** 时段限制 */
  limitTime: (string | null)[];
  /** 折扣类型 */
  discountType: string;
  /** 寄件城市流向 */
  cityFlowDirectionListFullMinus: ICityFlowDirection[];
  /** 权益列表 */
  equityList: IConfigEquityData[];
}

export type IResApplySendActivitySaveOrUpdate = undefined;

export interface IReqApplySendActivityDetail {
  /** 发券活动编码 */
  code: string;
}

export interface IResApplySendActivityQuery {
  /** 发券活动名称 */
  name: string;
  /** 发券活动编码 */
  code: string;
  /** 活动开始时间 */
  startTime: string;
  /** 活动结束时间 */
  endTime: string;
  /** 发券客户层级 */
  customerLayer: string;
  /** 发券客户范围，RELATION：小哥绑定客户，DEPT：小哥负责区域客户，CUSTOMER：指定客户 */
  customerGroupType: string;
  /* 活动优先级 */
  weight: number;
  /** 小哥画像 */
  staffGroupCode?: string;
  /** 权益开始类型 */
  equityStartType: string;
  /** 权益生效日期 */
  equityStartTime: string;
  /** 权益结束类型 */
  equityEndType: string;
  /** 权益失效日期 */
  equityEndTime: string;
  /** 权益自生效后的生效天数 */
  equityEndDay: string;
  /** 周期规则 */
  rangeRule: number[];
  /** 寄件产品类型列表 */
  sendProductType: string[];
  /** 重量范围 */
  weightRange: string[];
  /** 券类型 */
  equityType: string;
  /** 时段限制 */
  limitTime: string[];
  /** 折扣类型 */
  discountType: string;
  /** 寄件城市流向 */
  cityFlowDirectionListFullMinus: ICityFlowDirection[];
  /** 权益列表 */
  equityList: IConfigEquityData[];
  /** 活动状态 */
  status: string;
}

/* 拉取模板列表 */
export interface IReqApplySendActivityList extends IPageParams {
  /** 活动编号 */
  code?: string;
  /** 活动名称 */
  name?: string;
  /** 活动状态 */
  status?: string;
  /** 创建人 */
  creator?: string;
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
}

export type TResApplySendActivityList = IResList<{
  /** 活动编号 */
  code: string;
  /** 活动名称 */
  name: string;
  /** 活动类型 */
  type: string;
  /** 活动状态 */
  status: string;
  /** 活动时间 */
  activeTime: string;
  /** 小哥人数 */
  empNum: string;
  /** 创建人 */
  creator: string;
  /** 上线时间 */
  startTime: string;
  /** 是否包含全量小哥 */
  hasAllEmpCode: boolean;
}>;

export interface IReqApplySendActivityOnline {
  /** 活动编码 */
  code: string;
}

export type IResApplySendActivityOnline = undefined;

export interface IReqApplySendActivityOffline {
  /** 活动编码 */
  code: string;
}

export type IResApplySendActivityOffline = undefined;

export interface IReqApplySendActivityDelete {
  /** 活动编码 */
  code: string;
}

export type IResApplySendActivityDelete = undefined;
