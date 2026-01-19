import type { ICityFlowDirection, IConfigEquityData } from '@/apis/methods/activity/applySendActivity/types';

/* 去到详情页的操作类型 */
export type TPageAction = 'add' | 'detail' | 'edit' | 'copy';

export interface ITreeOption {
  label: string;
  value: string;
  disabled?: boolean;
  children?: ITreeOption[];
}

/** 画像 */
export interface IPortraitOption {
  /** 画像名称 */
  label: string;
  /** 画像编码 */
  value: string;
  /** 有效时间 */
  invalidTime: string;
  /** 有效期类型 */
  validType: number;
}

/** 申请模板form */
export interface ICouponTemplateFormData {
  /* 发券活动编码 */
  code: string | undefined;
  /* 发券活动名称 */
  name: string;
  // /* 活动时间 */
  // activityRange: Date[];
  /* 活动开始时间 */
  startTime: string;
  /* 活动结束时间 */
  endTime: string;
  /* 发券客户层级 */
  customerLayer: string;
  /* 发券范围 */
  customerGroupType: string;
  /* 活动优先级 */
  weight: number | null;
  /* 权益开始时间类型 */
  equityStartType: string;
  /* 权益生效日期 */
  equityStartTime: string;
  /* 权益结束时间类型 */
  equityEndType: string;
  /* 权益失效日期 */
  equityEndTime: string;
  /* 权益自生效后的生效天数 */
  equityEndDay: number | null;
  /* 周期规则 */
  rangeRule: number[];
  /* 寄件产品类型列表 */
  sendProductType: string[];
  /* 重量范围 */
  weightRange: number[];
  /* 券类型，1：优惠券、2：限时折扣 */
  equityType: string;
  /* 时段限制 */
  limitTime: (number | null)[];
  /* 寄件城市流向 */
  cityFlowDirectionListFullMinus: ICityFlowDirection[];
  /* 折扣类型 */
  discountType: string;
  /* 权益列表 */
  equityList: IConfigEquityData[];
}

/** 权益时间配置 */
export interface ICouponTimeData {
  /** 权益开始时间 */
  equityStartTime: string;
  /** 权益失效时间 */
  equityEndTime: string;
  /** 券失效时间类型 */
  couponEndType: string;
  /** 券失效时间 */
  couponEndTm: string;
}
