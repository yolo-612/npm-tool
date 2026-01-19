/**
 * @description 接口参数类型
 */

import type { ACTIVITY_STATUS } from '@/pages/activity/marketActivity/types';
import type { IPageParams, IResList } from '@/types';

/** 活动收集项列表 */
export interface IActivityCollectionType {
  /** 输入项内容对应的商机信息收集表的字段 */
  fillInKey: string;
  /** 0：必要收集项，1可选收集项 */
  isOptional: number;
  /** 0：已选中，1未选中 */
  isSelected: number;
  /** 输入项名称 */
  inputName: string;
  /** 输入项描述 */
  inputDesc: string;
  /** 输入项类型，FILL为填写，SELECT为选择 */
  inputType: string;
  /** 排序权重 */
  rank?: number;
}

/** 营销活动保存更新/活动详细信息接口 */
export interface IPlanDocumentFile {
  /** 文件的相对路径 */
  fileUri: string;
  /** 活动文件名 */
  fileName: string;
  /** 活动文件名 */
  summaryFileName?: string
  /** http的域名路径 */
  httpUrl: string;
  /** https的域名路径 */
  httpsUrl: string;
  /** 存储的路径 */
  pmpOssPath: string;
}
/** 活动基础信息 */
export interface IActivityBasic {
  /** 活动名称 */
  name?: string;
  /** 活动编码（空值表示新增、非空值表示修改） */
  code?: string;
  /** 活动类型 */
  type?: string;
  /** 活动状态 */
  activityStatus?: ACTIVITY_STATUS;
  /** 活动开始时间 */
  startTime?: string;
  /** 活动结束时间 */
  endTime?: string;
  /** 创建人工号 */
  creator?: string;
  /** 创建人名称 */
  empName?: string;
  /** 创建人地区代码 */
  creatorAreaCode?: string;
  /** 创建人地区 */
  creatorAreaName?: string;
  /** 活动简介 */
  activityDesc?: string;
}
/** 活动模板信息 */
export interface IActivityTemplate {
  /** 模板编码 */
  templateCode?: string;
}
/** 活动拓展信息 */
export interface IActivityExtend {
  /** 预估参与人数 */
  estimateParticipantCount?: number;
  /** 活动预算金额 */
  budgetAmount?: number;
  /** 活动方案文件 */
  planDocument?: string;
  /** 活动方案文件名 */
  fileName?: string;
  /** 活动方案文件名 */
  planDocumentFileName?: string;
  /** 活动方案信息 */
  planDocumentFile?: IPlanDocumentFile;
}
export interface IActivityDetailParams {
  /** 活动基础信息 */
  activityBasic?: IActivityBasic;
  /** 活动拓展信息 */
  activityExtend?: IActivityExtend;
  /** 活动模板信息 */
  activityTemplate?: IActivityTemplate;
  /** 必选 */
  requiredOptions?: string[];
  /** 可选 */
  optionalOptions?: string[];
  /** 活动收集项列表 */
  collectionList?: IActivityCollectionType[];
  /** 保存为草稿/确认 标识，true代表保存为草稿，false代表确认 */
  saveAsDraft?: boolean;
}

/** 活动查询参数接口类型 */
export interface IActivityQuery {
  /** 活动名称 */
  name?: string;
  /** 活动编码 */
  code?: string;
  /** 活动状态 */
  activityStatus?: string;
  /** 审核状态 */
  approvalStatus?: string;
  /** 活动类型 */
  type?: string;
  /** 创建人工号 */
  creator?: string;
  /** 创建人名称 */
  empName?: string;
  /** 创建人地区代码 */
  creatorAreaCode?: string;
  /** 创建人地区 */
  creatorAreaName?: string;
  /** 活动开始时间 */
  startTime?: string;
  /** 活动结束时间 */
  endTime?: string;
  /** 活动时间 - 搜索栏 */
  timeRange?: Date[];
}
/** 活动查询参数接口类型 */
export interface IActivityQueryRequest extends IActivityQuery, IPageParams {}

/** 活动列表项接口参数类型 */
export interface IActivityListItem {
  /** 活动名称 */
  name: string;
  /** 活动编码 */
  code: string;
  /** 活动状态 */
  activityStatus: string;
  /** 审核状态 */
  approvalStatus: string;
  /** 活动类型 */
  type: string;
  /** 创建人工号 */
  creator: string;
  /** 创建人地区编码 */
  creatorAreaCode: string;
  /** 活动开始时间 */
  startTime: string;
  /** 活动结束时间 */
  endTime: string;
  /** 活动创建时间 */
  createTime: string;
}

/** 活动列表接口参数类型 */
export type IActivityListResponse = IResList<IActivityListItem>

/** 创建人地区编码查询接口返参类型 */
export interface IAreaCodeResponse {
  /** 创建人地区代码 */
  creatorAreaCode: string;
  /** 创建人地区名称 */
  creatorAreaName: string;
}

/** 地区编码 */
export interface IAreaCode {
  /** 地区代码 */
  areaCode: string;
  /** 地区名称 */
  areaName: string;
}
/** 下拉筛选创建人地区编码列表 */
export interface IAreaCodeListResponse {
  list: IAreaCode[];
}

// ***************** 模板信息 ****************
export enum ITemplateType {
  /** 系统模板 */
  SYSTEM = 'SYSTEM',
  /** 个人模板 */
  PERSONAL = 'USER',
}
export enum ITemplateRecommendType {
  /** 不推荐 */
  NOT_RECOMMEND = 0,
  /** 推荐 */
  RECOMMEND = 1,
}
/** 模板列表接口-请求参数 */
export interface IActivityTemplateListRequest extends IPageParams {
  /** 模板类型，0:系统模板, 1:个人模板 */
  templateType: ITemplateType;
  /** 业务类型 */
  businessType: string;
}
/** 模板信息 */
export interface ITemplateInfo {
  /** 模板编码 */
  templateCode?: string;
  /** 模板名称 */
  templateName?: string;
  /** 模板对应的封面图，位于模板详情 */
  titleImage?: string;
  /** 是否推荐，0表示不推荐，1表示推荐 */
  isRecommend?: ITemplateRecommendType;
}
/** 模板信息-返回信息 */
export interface ITemplateInfoResponse {
  /** 模板类型 */
  templateType?: ITemplateType;
  /** 模板名称 */
  templateName: string;
  /** 业务类型 */
  businessType: string;
  /** 模板内容Json */
  templateJson: string;
}
/** 模板列表接口-返回信息 */
export type IActivityTemplateListResponse = IResList<ITemplateInfo>

// ***************** 活动效果 ****************
/** 活动留资明细列表请求参数 */
export interface IActivityBusinessSearchRequest extends IPageParams {
  /** 活动编码 */
  code: string;
}
/** 客户信息列表 */
export type IActivityBusinessSearchResponse = IResList<{
  /** 客户姓名 */
  customerName: string;
  /** 客户手机号 - 密文 */
  customerPhone: string;
  /** 客户手机号 - 明文 */
  customerWhitePhone: string;
  /** 是否显示明文 */
  isWhite: string;
  /** 公司名称 */
  companyName: string;
  /** 公司地址 */
  companyAddr: string;
  /** 公司地址 - 明文 */
  companyWhiteAddr: string;
  /** 公司所属行业 */
  companyLayer: string;
  /** 公司规模 */
  companySize: string;
  /** 月结卡号 */
  monthCard: string;
  /** 每月预估快递费用 */
  estimatedMonthlyCourierCost: string;
  /** 意向合作业务 */
  potentialCooperationBusiness: string;
}>

/** 营销活动效果请求 */
export interface IActivityEffectRequest {
  /** 活动编码 */
  code: string;
}
/** 营销活动效果查询 */
export interface IActivityEffectResponse {
  /** 现场新增会员数 */
  newMemberCount?: number;
  /** 现场新增线索数 */
  newClueCount?: number;
  /** 现场储值卡创收金额，单位分 */
  storedValueRevenue?: number;
  /** 现场寄件创收金额，单位分 */
  parcelRevenue?: number;
  /** 活动实际费用，单位分 */
  actualCost?: number;
  /** 活动总结文件 */
  summaryFile?: string;
  /** 文件名 */
  summaryFileName?: string
  /** 活动总结文件下载地址 */
  summaryFileDownloadUrl?: IPlanDocumentFile;
}
