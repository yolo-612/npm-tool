/**
 * @description: 操作按钮
 */

import { ACTIVITY_STATUS, ACTIVITY_APPROVAL_STATUS } from '../../types';

/** 解构活动状态的key */
const {
  DRAFT,
  UNSTART,
  PROCESSING,
  MANUAL_STOP,
  END,
} = ACTIVITY_STATUS;
/** 解构活动审核状态的key */
const {
  TO_APPROVE,
  APPROVING,
  APPROVE_REJECT,
  APPROVED,
} = ACTIVITY_APPROVAL_STATUS;

/** 提交审核 */
export const OPERATION_COMMIT_AUDIO = (row: { activityStatus: ACTIVITY_STATUS, approvalStatus: ACTIVITY_APPROVAL_STATUS }) => {
  const { activityStatus, approvalStatus } = row;
  if (UNSTART === activityStatus && TO_APPROVE === approvalStatus) return true;
  if (UNSTART === activityStatus && APPROVE_REJECT === approvalStatus) return true;
  return false;
};

/** 启动 */
export const OPERATION_ENABLE = (row: { activityStatus: ACTIVITY_STATUS, approvalStatus: ACTIVITY_APPROVAL_STATUS }) => {
  const { activityStatus, approvalStatus } = row;
  if (UNSTART === activityStatus && APPROVED === approvalStatus) return true;
  if (MANUAL_STOP === activityStatus && APPROVED === approvalStatus) return true;
  return false;
};

/** 停用 */
export const OPERATION_DISABLE = (row: { activityStatus: ACTIVITY_STATUS, approvalStatus: ACTIVITY_APPROVAL_STATUS }) => {
  const { activityStatus, approvalStatus } = row;
  if (PROCESSING === activityStatus && APPROVED === approvalStatus) return true;
  return false;
};

/** 编辑 */
export const OPERATION_EDIT = (row: { activityStatus: ACTIVITY_STATUS, approvalStatus: ACTIVITY_APPROVAL_STATUS }) => {
  const { activityStatus, approvalStatus } = row;
  if (UNSTART === activityStatus && APPROVING === approvalStatus) return false;
  if (END === activityStatus && APPROVED === approvalStatus) return false;
  return true;
};

/** 复制 */
export const OPERATION_COPY = (row: { activityStatus: ACTIVITY_STATUS, approvalStatus: ACTIVITY_APPROVAL_STATUS }) => {
  const { activityStatus, approvalStatus } = row;
  if (DRAFT === activityStatus) return false;
  return true;
};

/** 删除 */
export const OPERATION_DELETE = (row: { activityStatus: ACTIVITY_STATUS, approvalStatus: ACTIVITY_APPROVAL_STATUS }) => {
  const { activityStatus, approvalStatus } = row;
  if (UNSTART === activityStatus && TO_APPROVE === approvalStatus) return true;
  if (UNSTART === activityStatus && APPROVE_REJECT === approvalStatus) return true;
  if (DRAFT === activityStatus) return true;
  return false;
};

/** 活动效果 */
export const OPERATION_EFFECT = (row: { activityStatus: ACTIVITY_STATUS, approvalStatus: ACTIVITY_APPROVAL_STATUS }) => {
  const { activityStatus, approvalStatus } = row;
  if (PROCESSING === activityStatus && APPROVED === approvalStatus) return true;
  if (MANUAL_STOP === activityStatus && APPROVED === approvalStatus) return true;
  if (END === activityStatus && APPROVED === approvalStatus) return true;
  return false;
};
