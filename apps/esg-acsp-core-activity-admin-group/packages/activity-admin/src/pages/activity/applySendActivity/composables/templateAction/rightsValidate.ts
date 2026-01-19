import type { IResQueryCoupon } from '@/apis/methods/common/types';
import type { ICouponTemplateFormData, ICouponTimeData } from '../types';
import { EQUITY_END_TIME_TYPE, EQUITY_START_TIME_TYPE, EQUITY_TYPE } from '../map';
import { areValuesEqual } from '@/utils/tool';
import { areArrayEqualIgnoreOrder, convertLimitTimeToStringRange } from '../utils';

/* 根据表单填写信息判断是否可添加权益 */
export const addRightsDisabled = (formData: ICouponTemplateFormData, action: string) => {
  if (action === 'detail') return true;
  const {
    startTime,
    endTime,
    equityStartType,
    equityStartTime,
    equityEndType,
    equityEndTime,
    equityEndDay,
    rangeRule,
    sendProductType,
    equityType,
    discountType,
  } = formData;
  console.log('sendProductType', sendProductType.length);
  // 验证活动时间
  if (!startTime || !endTime) return true;
  // 验证权益开始时间
  if (equityStartType === EQUITY_START_TIME_TYPE.ORDER_TIME && !equityStartTime) return true;
  // 验证权益结束时间
  if (equityEndType === EQUITY_END_TIME_TYPE.FIXED && !equityEndTime) return true;
  if (equityEndType === EQUITY_END_TIME_TYPE.DYNAMIC && !equityEndDay) return true;
  // 验证权益周期
  if (!rangeRule.length) return true;
  // 验证寄件产品类型
  if (sendProductType.length === 0) return true;
  // 验证券类型
  if (!equityType) return true;
  // 验证折扣类型
  if (!discountType) return true;
  if (formData.equityList.length >= 10) return true;
  return false;
};

/** 权益-活动时间校验 */
export const validateRightsTime = (
  formData: ICouponTemplateFormData,
  rightsTimeData: ICouponTimeData,
): { isValid: boolean; message?: string } => {
  // 活动开始时间
  const activityStartDate = new Date(formData.startTime).getTime();
  // 活动结束时间
  const activityEndDate = new Date(formData.endTime).getTime();
  // 权益开始时间
  const equityStartDate = new Date(rightsTimeData.equityStartTime).getTime();
  // 权益结束时间
  const equityEndDate = new Date(rightsTimeData.equityEndTime).getTime();
  // 券结束时间
  const couponEndDate = new Date(rightsTimeData.couponEndTm).getTime();

  // 券结束时间类型为固定有效期时判断
  if (
    formData.equityEndType === EQUITY_END_TIME_TYPE.FIXED
    && formData.equityEndType === rightsTimeData.couponEndType
    && couponEndDate < activityEndDate
  ) {
    return { isValid: false, message: '券结束时间与活动时间不匹配' };
  }

  if (equityStartDate > activityStartDate || equityEndDate < activityEndDate) {
    return { isValid: false, message: '权益时间与活动时间不匹配' };
  }

  return { isValid: true };
};

/* 权益-配置信息匹配校验 */
const validateRightsConfig = (
  formData: ICouponTemplateFormData,
  equityData: IResQueryCoupon,
): { isValid: boolean; message?: string } => {
  const {
    startTm,
    startTmType,
    endTm,
    endTmType,
    inforceDuration,
    week,
    weight,
    limit,
    deductionType,
    cityFlowDirectionListFullMinus,
    productType,
  } = equityData.equities[0];
  const {
    equityStartType,
    equityStartTime,
    equityEndType,
    equityEndTime,
    equityEndDay,
    rangeRule,
    weightRange,
    equityType,
    limitTime,
    discountType,
    cityFlowDirectionListFullMinus: cityFlowDirectionList,
    sendProductType,
  } = formData;

  // 不匹配的标签
  const notMatchFieldLabels = [];

  // 配置的券开始时间，设置为当天开始时间（0点0分0秒0毫秒）
  const formCouponStartDate = new Date(equityStartTime).setHours(0, 0, 0, 0);
  // 配置的券结束时间，设置为当天结束时间（23点59分59秒0毫秒）
  const formCouponEndDate = new Date(equityEndTime).setHours(23, 59, 59, 0);

  // 权益券开始时间
  const couponStartDate = new Date(startTm).getTime();
  // 权益券结束时间
  const couponEndDate = new Date(endTm).getTime();

  // 判断券开始时间是否一致
  if (
    equityStartType !== startTmType
    || (equityStartType === EQUITY_START_TIME_TYPE.ORDER_TIME && formCouponStartDate !== couponStartDate)
  ) {
    notMatchFieldLabels.push('权益开始时间');
  }

  // 判断券结束时间是否一致
  if (
    equityEndType !== endTmType
    || (equityEndType === EQUITY_END_TIME_TYPE.FIXED && formCouponEndDate !== couponEndDate)
    || (equityEndType === EQUITY_END_TIME_TYPE.DYNAMIC && equityEndDay !== Number(inforceDuration))
  ) {
    notMatchFieldLabels.push('权益结束时间');
  }

  // 将可能为字符串的数组解析为实际的数组（例如从JSON字符串解析）
  const parseArrayFromJson = (jsonStr: string | null): any[] => (jsonStr ? JSON.parse(jsonStr) : []);

  // 判断周期是否一致
  const sortedFormRangeRule = toRaw(rangeRule).sort();
  const sortedRightsRangeRule = parseArrayFromJson(week).sort();
  if (!areValuesEqual(sortedFormRangeRule, sortedRightsRangeRule)) {
    notMatchFieldLabels.push('周期');
  }

  // 判断寄件产品是否一致
  const sortedFormProductType = toRaw(sendProductType).sort();
  const sortedRightsProductType = parseArrayFromJson(productType).sort();
  if (!areValuesEqual(sortedFormProductType, sortedRightsProductType)) {
    notMatchFieldLabels.push('寄件产品类型');
  }

  const formWeightRange = toRaw(weightRange).map(Number);
  const rightsWeightRange = parseArrayFromJson(weight).map(Number);
  if (!areValuesEqual(formWeightRange, rightsWeightRange)) {
    notMatchFieldLabels.push('寄件重量');
  }

  // 判断时段限制是否一致
  const formLimitTime = convertLimitTimeToStringRange(limitTime);
  const rightsLimitTime = parseArrayFromJson(limit);
  if (equityType === EQUITY_TYPE.TIME_DISCOUNT && !areValuesEqual(formLimitTime, rightsLimitTime)) {
    notMatchFieldLabels.push('时段限制');
  }

  // 判断流向限制是否一致
  if (!areArrayEqualIgnoreOrder(toRaw(cityFlowDirectionList), toRaw(cityFlowDirectionListFullMinus))) {
    notMatchFieldLabels.push('城市流向');
  }

  if (discountType !== deductionType) {
    // 判断折扣类型是否一致
    notMatchFieldLabels.push('折扣类型');
  }
  return {
    isValid: !notMatchFieldLabels.length,
    message: `添加失败，${notMatchFieldLabels.join('、')}信息与配置不一致`,
  };
};

/* 添加权益前置校验 */
export const validateBeforeSubmitRights = (formData: ICouponTemplateFormData, equityData: IResQueryCoupon) => {
  if (formData.equityType === EQUITY_TYPE.COUPON && equityData.equities.length > 1) {
    return { isValid: false, message: '不支持添加多个权益的权益包' };
  }

  if (!equityData.equities.length) {
    return { isValid: false, message: '不支持添加无权益的权益包/限时折扣' };
  }

  if (equityData.equities[0].equityValue === '-1') {
    return { isValid: false, message: '添加失败，权益抵扣票数不能为不限' };
  }

  // 权益时间校验
  const timeValidRes = validateRightsTime(formData, {
    equityStartTime: equityData.startTm,
    equityEndTime: equityData.endTm,
    couponEndType: equityData.equities[0].endTmType,
    couponEndTm: equityData.equities[0].endTm,
  });
  if (!timeValidRes.isValid) return { isValid: false, message: `添加失败，${timeValidRes.message}` };

  // 权益信息匹配校验
  const configValidRes = validateRightsConfig(formData, equityData);
  if (!configValidRes.isValid) return configValidRes;

  // 折扣/金额重复添加校验
  const discountList = formData.equityList.map((item) => item.discountValue);
  if (discountList.includes(equityData.equities[0].deductionValue)) {
    return { isValid: false, message: '折扣/金额存在重复' };
  }

  return { isValid: true };
};
