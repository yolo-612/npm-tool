import type { IRewardInfo } from '@/apis/methods/activity/directSendActivity/types';

export interface IDirectSendFormData {
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
  /** 活动状态 */
  source?: string;
  /** 权益名称 */
  equityName: string;
  /** 权益编码 */
  equityCode: string;
  /** 券类型，优惠券、限时折扣 */
  equityType: string;
  /** 折扣类型，DISCOUNT：折扣，AMOUNT：立减 */
  discountType: string;
  /** 折扣率/金额 */
  discountValue: string;
  /** 权益数量 */
  equityCount: string;
  /** 发券次数 */
  equityPkgCount: number;
  /** 券生效日期 */
  equityStartTime: string;
  /** 券失效日期 */
  equityEndTime: string;
  /** 小哥画像 */
  staffGroupCode: string;
  /** 券开始类型 */
  equityStartType: string;
  /** 券结束类型 */
  equityEndType: string;
  /** 用于组件：活动开始和结束时间 */
  // activityRange: Date[] | undefined;
  /** 券有效期 */
  couponValidDuration: number;
  /** 权益生效日期 */
  rightsStartTime: string;
  /** 权益失效日期 */
  rightsEndTime: string;
  /** 券种类数量 */
  couponTypeCount: number;
  /* 抵扣票数: -1表示不限票数 */
  equityValue?: string;
  /** 场景图片 */
  titleTag?: string;
  /** 卡片背景 */
  cardBackground?: string;
  /** 是否奖励标识，0：无奖励，1：有奖励 */
  rewardFlag: string | number;
  /** 奖励预算编码 */
  rewardProjectCode?: string;
  /** 奖励统计类型，TICKET:单票 */
  rewardStatisticalType?: string;
  /** 统计逻辑：TICKET_USED_EQUITY：单票权益使用 */
  taskAction?: string;
  /** 奖励信息 */
  rewardList: IRewardInfo[];
  /** 客群列表 - 适用于奖励类型为否的时候 */
  codeList?: string[];
}

export interface ITreeOption {
  label: string;
  value: string;
  children?: ITreeOption[]
}

/** 状态 */
export enum PAGE_ACTION {
  ADD = 'add',
  DETAIL = 'detail',
  EDIT = 'edit',
  COPY = 'copy',
}

/** 折扣类型 */
export const DEDUCTION_TYPE = {
  // eslint-disable-next-line quote-props
  '10': '折扣',
  // eslint-disable-next-line quote-props
  '20': '固定金额',
};

/** 创建来源 */
export enum CUSTOMER_GROUP_TYPE {
  /** 后台创建 */
  CREATE_CODE = '0',
  /** 小哥提报 */
  EMP_CODE = '1',
}

/** 发券客户范围 */
export enum CUSTOMER_SCOPE {
  /** 小哥负责区域客户 */
  AREA = '1',
  /** 指定客户 */
  CUSTOMER = '2',
}
/** 发券客户范围列表 */
export const CUSTOMER_SCOPE_OPTION = [
  {
    label: '小哥负责区域客户',
    value: CUSTOMER_SCOPE.AREA,
  },
  {
    label: '指定客户',
    value: CUSTOMER_SCOPE.CUSTOMER,
  },
];

/** 是否奖励 */
export enum REWARD_FLAG {
  /** 否 */
  NO = 0,
  /** 是 */
  YES = 1,
}
/** 是否奖励的列表 */
export const REWARD_FLAG_OPTION = [
  {
    label: '是',
    value: REWARD_FLAG.YES,
  },
  {
    label: '否',
    value: REWARD_FLAG.NO,
  },
];

/** 奖励类型 */
export enum REWARD_TYPE {
  /** 单票 */
  TICKET = 'TICKET',
}
/** 奖励类型的列表 */
export const REWARD_TYPE_OPTION = [
  {
    label: '单票奖励',
    value: REWARD_TYPE.TICKET,
  },
];

/** 单票统计逻辑 */
export enum SINGLE_TICKET {
  // 权益使用
  TICKET_USED_EQUITY = 'TICKET_USED_EQUITY',
}
/** 单票统计逻辑-列表 */
export const SINGLE_TICKET_OPTION = [
  {
    label: '权益使用',
    value: SINGLE_TICKET.TICKET_USED_EQUITY,
  },
];

/** 全部客群 */
export const ALL_GROUPS = {
  label: '区域所有客户',
  value: 'ALL',
  disabled: false,
};
