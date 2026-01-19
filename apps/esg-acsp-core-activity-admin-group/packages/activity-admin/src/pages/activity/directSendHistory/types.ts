interface IHistoryQueryFormData {
  /** 权益编码 */
  equityCode?: string;
  /** 小哥工号 */
  empCode?: string;
  /** 活动名称 */
  name?: string;
  /** 活动编码 */
  couponActivityCode?: string;
  /** 活动类型 */
  source?: string;
  /** 月结卡号 */
  monthCard?: string;
  /** 发券状态 */
  status?: string;
  /** 历史事件范围 */
  timeRange?: Date[];
}
