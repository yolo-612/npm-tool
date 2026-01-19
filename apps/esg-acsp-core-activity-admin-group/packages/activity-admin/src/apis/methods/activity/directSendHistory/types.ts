import type { IPageParams, IResList } from '@/types/base';

export interface IReqQueryDirectSendHistoryList extends IPageParams {
  /** 活动编码 */
  couponActivityCode?: string;
  /** 活动名称 */
  name?: string;
  /** 来源 */
  source?: string;
  /** 权益编码 */
  equityCode?: string;
  /** 发券状态 */
  status?: string;
  /** 小哥工号 */
  empCode?: string;
  /** 月结卡号 */
  monthCard?: string;
  /** 发券时间开始时间 */
  startTime?: string;
  /** 发券时间结束时间 */
  endTime?: string;
  /** 活动状态列表 */
  activityStatus?: string;
  /** 申请券活动编码，精确搜索 */
  templateCode?: string;
  /** 申请券活动名称，模糊搜索 */
  templateName?: string;
  /** 小哥范围，模糊搜索 */
  rangeName?: string;
  /** 审批完成时间-开始 */
  ecpStartTime?: string;
  /** 审批完成时间-结束 */
  ecpEndTime?: string;
}

export type IResQueryDirectSendHistoryList = IResList<{
  /** 活动编号 */
  couponActivityCode: string;
  /** 活动名称 */
  name: string;
  /** 创建来源 */
  source: string;
  /** 权益编码 */
  equityCode: string;
  /** 小哥工号 */
  empCode: string;
  /** 客户名称 */
  customerName: string;
  /** 客户月结卡号 */
  monthCard: string;
  /** 发券状态 */
  status: string;
  /** 发券时间 */
  sendTime: string;
  /** 券数量 */
  equityCount: string;
  /** 申请券活动编码 */
  templateCode: string;
  /** 申请券活动名称 */
  templateName: string;
  /** 活动状态 */
  activityStatus: string;
  /** 网点编码 */
  deptCode: string;
  /** 网点名称 */
  deptName: string;
  /** 分部编码 */
  divisionCode: string;
  /** 分部名称 */
  divisionName: string;
  /** 地区编码 */
  areaCode: string;
  /** 地区名称 */
  areaName: string;
  /** 审批完成时间，默认为1970-01-01 00:00:00 */
  ecpComplete: string;
  /** 寄件产品类型 */
  sendProductType: string;
  /** 周期规则 */
  rangeRule: string;
}>;

export interface IReqQueryDeptListParams {
  /** 范围搜索名称 */
  rangeName: string;
}

export interface IQueryDeptItem {
  /** 地区编码 */
  areaCode: string;
  /**  地区名称 */
  areaName: string;
  /** 分部编码 */
  divisionCode: string;
  /** 分部名称 */
  divisionName: string;
  /** 网点编码 */
  deptCode: string;
  /** 网点名称 */
  deptName: string;
  /** 营业站编码 */
  stationCode: string;
  /** 营业站名称 */
  stationName: string;
  /** 组织架构级别 */
  type: number;
}
export type TResQueryDeptListRes = IResList<IQueryDeptItem>;
