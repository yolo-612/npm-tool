/** 查询奖励权益请求参数 */
export interface IReqQueryCoupon {
  type: 1 | 2;
  code: string;
}

/**
 * 表示城市流向的方向信息
 */
export interface CityFlowDirection {
  /** 来源城市流向代码列表 */
  sourceDistCode: string[];
  /** 目标城市流向代码列表 */
  targetDistCode: string[];
}

/**
 * 权益信息数据
 */
export interface EquitiesInfo {
  /** 权益编码 */
  equityCode: string;
  /** 券名称 */
  equityAlias: string;
  /** 券描述 */
  equityDesc: string;
  /** 抵扣类型：10=折扣；20=固定金额 */
  deductionType: string;
  /** 抵扣值 */
  deductionValue: string;
  /** 最高抵扣金额 */
  maxDeductionValue: string;
  /** 生效时间类型：1=指定时间；2=即时生效 */
  startTmType: string;
  /** 生效时间，startTmType=1时有效 */
  startTm: string;
  /** 过期时间类型：1=指定时间；2=动态有效期 */
  endTmType: string;
  /** 失效时间，endTmType=1时有效 */
  endTm: string;
  /** 有效天数，endTmType=1时有效 */
  inforceDuration: string;
  /** 票数 */
  equityValue: string;
  /** 城市流向 */
  cityFlowDirectionList: CityFlowDirection[];
  /** 城市流向 */
  cityFlowDirectionListFullMinus: CityFlowDirection[];
  /** 时段 */
  limit: string;
  /** 周期规则 */
  week: string;
  /** 重量限制 */
  weight: string;
  /** 寄件产品类型 */
  productType: string;
}

/**
 * 活动优惠券搜索响应接口
 */
export interface IResQueryCoupon {
  /** 包数据ID */
  pkgDataId: string;
  /** 包类型：1=权益包；2=限时折扣 */
  periodEquityType: string;
  /** 活动名称 */
  name: string;
  /** 活动描述 */
  description: string;
  /** 活动开始时间 */
  startTm: string;
  /** 活动结束时间 */
  endTm: string;
  /** 总库存 */
  equityPkgCount: string;
  /** 剩余库存 */
  equityPkgStockCount: string;
  /** 单一账号可发放次数 */
  maxCountPerAccount: string;
  /** 客户可见性，1=可见，0=不可见 */
  visible: string;
  /** 权益信息 */
  equities: EquitiesInfo[];
  /** 是否提示即将过期 */
  showReminder: boolean;
}

/* 异步下载文件 */
export interface IDownloadFileParam<T> {
  /* 业务标识 */
  businessMark: string;
  /* 业务请求数据 */
  queryReq: T;
  /* 下载额外标识 */
  downloadTag?: string;
}

/** 查询产品类型返回 */
export type IResSendProductType = {
  /* 索引 */
  id: number;
  /* 产品类型名称 */
  productName: string;
  /*  产品类型编码 */
  productCode: string;
}[];
