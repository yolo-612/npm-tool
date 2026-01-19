/** 直发券活动列表请求 */
export interface IReqDirectSendActivityList {
  /** 活动名称 */
  name?: string;
  /** 活动编号 */
  code?: string;
  /** 活动状态 */
  status?: string;
  /** 创建人 */
  creator?: string;
  /** 来源: CREATE:系统创建，EMP:小哥提报 */
  source?: string;
  /** 开始时间起始 */
  startTimeBegin?: string;
  /** 开始时间结束 */
  startTimeFinish?: string;
  /** 结束时间起始 */
  endTimeBegin?: string;
  /** 结束时间结束 */
  endTimeFinish?: string;
  /** 页码，默认为 1 */
  pageNum?: number;
  /** 页面大小，默认为 10 */
  pageSize?: number;
}

/** 直发券活动列表返回 */
export interface IResDirectSendActivityList {
  /** 当前页 */
  pageNum: number;
  /** 每页的数量 */
  pageSize: number;
  /** 总记录数 */
  totalSize: number;
  list: {
    /** 主键ID */
    id?: number;
    /** 发券活动编码 */
    code?: string;
    /** 发券活动名称 */
    name?: string;
    /** 提报活动状态，DRAFT：草稿，PROCESS：进行中，ENDED：已结束 todo 审批状态 */
    status?: string;
    /** 开始时间 */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
    /** 画像人数 */
    empCount?: number;
    /** 创建人 */
    creator?: string;
    /** 来源: CREATE:系统创建，EMP:小哥提报 */
    source?: string;
    /** 上线时间 */
    upTime?: string;
    /** 是否包含全量小哥 */
    hasAllEmpCode: boolean;
  }[];
}

export interface IReqDirectSendActivityDetail {
  /** 活动编码 */
  code: string;
}

export interface IRewardInfo {
  /** 单票积分 */
  pointTicket?: number;
  /** 客户总积分 */
  pointTotal?: number;
  /** 客群信息-列表 */
  groupCodeList?: string[];
}

export interface IResDirectSendActivityDetail {
  /** 活动id */
  id: number;
  /** 发券活动编码 */
  code: string;
  /** 发券活动名称 */
  name: string;
  /** 开始时间 */
  startTime: string;
  /** 结束时间 */
  endTime: string;
  /** 权益生效日期 */
  equityStartTime: string;
  /** 权益失效日期 */
  equityEndTime: string;
  /** 周期规则 */
  rangeRule: string;
  /** 寄件产品类型列表 */
  sendProductTypeList: string[];
  /** 重量范围 */
  weightRange: string;
  /** 券类型 */
  equityType: string;
  /** 限制时间段 */
  limitTime: string;
  /** 折扣类型 */
  discountType: string;
  /** 折扣率/金额 */
  discountValue: string;
  /** 数量 */
  equityCount: string;
  /** 发券次数 */
  equityPkgCount?: number;
  /** 权益名称 */
  equityName: string;
  /** 权益编码 */
  equityCode: string;
  /** 小哥画像编码 */
  staffGroupCode: string;
  /** 来源 */
  source: string;
  /** 发券客户范围，RELATION：小哥绑定客户，DEPT：小哥负责区域客户，CUSTOMER：指定客户 */
  customerGroupType: string;
  /** 发券客户层级 */
  customerLayer: string;
  /** 权益开始类型 */
  equityStartType: string;
  /** 权益结束类型 */
  equityEndType: string;
  /** 物料 */
  materialJson?: string;
  /** 活动状态 */
  status?: string;
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
  /** 奖励信息 */
  rewardDetailList?: IRewardInfo[];
}

export interface IReqDirectSendActivitySaveOrUpdate {
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
  /** 权益生效日期 */
  equityStartTime: string;
  /** 权益失效日期 */
  equityEndTime: string;
  /** 小哥画像 */
  staffGroupCode?: string;
  /** 权益开始类型 */
  equityStartType: string;
  /** 权益结束类型 */
  equityEndType: string;
  /** 物料 */
  materialJson: string;
}

export type IResDirectSendActivitySaveOrUpdate = undefined;

export interface IReqDirectSendActivityOnline {
  /** 活动编码 */
  code: string;
}

export type IResDirectSendActivityOnline = undefined;

export interface IReqDirectSendActivityOffline {
  /** 活动编码 */
  code: string;
}

export type IResDirectSendActivityOffline = undefined;

export interface IReqDirectSendActivityDelete {
  /** 活动编码 */
  code: string;
}

export type IResDirectSendActivityDelete = undefined;
