/* 字典 - 活动状态 */
export const DRAGON_ACTIVITY_STATUS = 'dragon_activity_manager_status';

// 去到详情页的操作类型 - key
export enum E_PAGE_ACTION {
  ADD = 'add',
  DETAIL = 'detail',
  EDIT = 'edit'
}

/* 活动状态 */
export enum ACTIVITY_STATUS {
  /** 草稿 */
  DRAFT = 'DRAFT',
  /** 未开始 */
  NOT_PROCESS = 'UN_STARTED',
  /** 进行中 */
  PROCESSING = 'PROCESSING',
  /** 已结束 */
  ENDED = 'ENDED',
  /** 已下线 */
  OFF_LINE = 'OFFLINE',
}
