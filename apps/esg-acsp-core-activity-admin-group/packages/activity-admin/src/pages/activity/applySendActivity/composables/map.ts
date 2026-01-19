/* 发券层级 */
export enum CUSTOMER_LAYER {
  PB2_1_2 = '0',
}
export const CUSTOMER_LAYER_OPTION = [
  {
    label: 'PB2.1-2.2',
    value: '0',
  },
];

/* 发券范围 */
export enum CUSTOMER_GROUP_TYPE {
  EMPLOYEE = '0',
  AREA = '1',
}
export const CUSTOMER_GROUP_TYPE_OPTION = [
  {
    label: '小哥绑定客户',
    value: '0',
  },
  {
    label: '小哥负责区域客户',
    value: '1',
  },
];

/* 权益开始时间 */
export enum EQUITY_START_TIME_TYPE {
  ORDER_TIME = '1',
  INSTEAD = '2',
}
export const EQUITY_START_TIME_OPTION = [
  {
    label: '即时生效',
    value: EQUITY_START_TIME_TYPE.INSTEAD,
  },
  {
    label: '指定时间生效',
    value: EQUITY_START_TIME_TYPE.ORDER_TIME,
  },
];

/* 权益结束时间 */
export enum EQUITY_END_TIME_TYPE {
  FIXED = '1',
  DYNAMIC = '2',
}
export const EQUITY_END_TIME_OPTION = [
  {
    label: '动态有效期',
    value: EQUITY_END_TIME_TYPE.DYNAMIC,
  },
  {
    label: '固定有效期',
    value: EQUITY_END_TIME_TYPE.FIXED,
  },
];

/* 周期配置 */
export const PERIOD_OPTION = [
  {
    label: '周日',
    value: 1,
  },
  {
    label: '周一',
    value: 2,
  },
  {
    label: '周二',
    value: 3,
  },
  {
    label: '周三',
    value: 4,
  },
  {
    label: '周四',
    value: 5,
  },
  {
    label: '周五',
    value: 6,
  },
  {
    label: '周六',
    value: 7,
  },
];

export enum EQUITY_TYPE {
  COUPON = '1',
  TIME_DISCOUNT = '2',
}

/* 权益类型 */
export const EQUITY_TYPE_OPTION = [
  {
    label: '权益券',
    value: '1',
  },
  {
    label: '限时折扣',
    value: '2',
  },
];

export enum DISCOUNT_TYPE {
  DISCOUNT = '10',
  AMOUNT = '20',
}

/* 折扣类型 */
export const DISCOUNT_TYPE_OPTION = [
  {
    label: '折扣',
    value: '10',
  },
  {
    label: '金额',
    value: '20',
  },
];

/* 活动状态 */
export enum ACTIVITY_STATUS {
  DRAFT = '0', // 草稿
  NOT_PROCESS = '1', // 未开始
  PROCESSING = '2', // 进行中
  ENDED = '3', // 已结束
  ONLINE = '4', // 上线中
}
