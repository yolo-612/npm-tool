/** 活动状态 */
export enum ACTIVITY_STATUS {
  DRAFT = '0', // 草稿
  TO_APPROVE = '1', // 待审批
  APPROVING = '2', // 审批中
  NOT_PROCESS = '3', // 未开始
  ONLINE = '4', // 上线中
  PROCESSING = '5', // 进行中
  ENDED = '6', // 已结束
  REBACK = '7', // 审核驳回
  FAILED = '8', // 申请失败
}
