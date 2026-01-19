/** 寄件周期 */
export const TIME_RANGE_MAP = {
  1: '周日',
  2: '周一',
  3: '周二',
  4: '周三',
  5: '周四',
  6: '周五',
  7: '周六',
};
export type TTimeRange = keyof typeof TIME_RANGE_MAP
