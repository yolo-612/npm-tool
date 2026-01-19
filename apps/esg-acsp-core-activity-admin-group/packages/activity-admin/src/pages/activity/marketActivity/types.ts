/** 去到详情页的操作类型 - key */
export enum E_PAGE_ACTION {
  ADD = 'add',
  DETAIL = 'detail',
  EDIT = 'edit',
  COPY = 'copy',
}

/** 活动状态 */
export enum ACTIVITY_STATUS {
  /** 草稿 */
  DRAFT = 'DRAFT',
  /** 待启用 */
  UNSTART = 'UNSTART',
  /** 启用中 */
  PROCESSING = 'PROCESSING',
  /** 手工停用 */
  MANUAL_STOP = 'MANUAL_STOP',
  /** 自动结束 */
  END = 'END',
}

/** 审核状态 */
export enum ACTIVITY_APPROVAL_STATUS {
  /** 待提交审核 */
  TO_APPROVE = 'TO_APPROVE',
  /** 审核中 */
  APPROVING = 'APPROVING',
  /** 审核通过 */
  APPROVED = 'APPROVED',
  /** 审核驳回 */
  APPROVE_REJECT = 'APPROVE_REJECT',
}

/** 活动类型 */
export enum ACTIVITY_TYPE {
  /** 线下商机活动 */
  BUSINESS_COLLECTION = 'BUSINESS_COLLECTION',
}

/** 活动列表 */
export const ACTIVITY_LIST_URL = '/activity/marketActivity/list';

/** 活动类型-复制路径 */
export enum ACTIVITY_COPY_URL {
  /** 线下商机活动 */
  BUSINESS_COLLECTION = '/activity/marketActivity/activity/business',
}

/** 活动类型-编辑路径 */
export enum ACTIVITY_EDIT_URL {
  /** 线下商机活动 */
  BUSINESS_COLLECTION = '/activity/marketActivity/activity/business/edit',
}

/** 活动类型-详情路径 */
export enum ACTIVITY_DETAIL_URL {
  /** 线下商机活动 */
  BUSINESS_COLLECTION = '/activity/marketActivity/activity/business/detail',
}
