import dayjs from 'dayjs';
import type { IConfigEquityData } from '@/apis/methods/activity/applySendActivity/types';
import type { ICouponTemplateFormData } from '../types';
import { validateRightsTime } from './rightsValidate';
import { ACTIVITY_STATUS, EQUITY_END_TIME_TYPE } from '../map';

/** 活动时间更新后，校验权益有效性 */
const validateEquityByActivityTime = (formData: ICouponTemplateFormData) => {
  const validateEquity = (item: IConfigEquityData) => validateRightsTime(formData, {
    equityStartTime: item.equityStartTime,
    equityEndTime: item.equityEndTime,
    couponEndType: formData.equityEndType,
    couponEndTm: dayjs(formData.equityEndTime).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  });
  const invalidEquity = formData.equityList.find((item) => !validateEquity(item).isValid);
  if (invalidEquity) {
    return validateEquity(invalidEquity);
  }
  return { isValid: true };
};

/** 活动时间更新后，校验画像有效性 */
const validatePortraitByActivityTime = (formData: ICouponTemplateFormData, portrait: { options: any[] }) => {
  const invalidPortrait = formData.equityList.find((item) => {
    const portraitItem = portrait.options.find((option) => option.value === item.staffGroupCode);
    return (
      portraitItem
      && portraitItem.validType === 0
      && new Date(portraitItem.invalidTime) < new Date(formData.endTime)
    );
  });
  if (invalidPortrait) {
    return { isValid: false, message: '画像结束时间早于活动结束时间' };
  }
  return { isValid: true };
};

/** 活动时间校验 */
export const validateActivityTime = (
  formData: ICouponTemplateFormData,
  portrait: { options: any[] },
  detailStatus: string,
  validateType: string,
) => {
  return [
    {
      required: true,
      message: '请选择活动时间',
    },
    {
      validator: (_rule: any, value: any, callback: any) => {
        const targetValue = value ? new Date(value) : value;
        console.log('detailStatus: ', detailStatus);
        if (
          detailStatus !== ACTIVITY_STATUS.PROCESSING
          && validateType === 'startTime'
          && targetValue && targetValue.getTime() < new Date().getTime()) {
          callback(new Error('活动开始时间不能小于当前时间'));
          return;
        }
        if (new Date(formData.startTime).getTime() > new Date(formData.endTime).getTime()) {
          callback(new Error('活动结束时间必须大于活动开始时间'));
          return;
        }
        const equityValidRes = validateEquityByActivityTime(formData);
        if (!equityValidRes.isValid) {
          callback(new Error(equityValidRes.message));
          return;
        }
        const portraitValidRes = validatePortraitByActivityTime(formData, portrait);
        if (!portraitValidRes.isValid) {
          callback(new Error(portraitValidRes.message));
          return;
        }
        callback();
      },
    },
  ];
};

/** 权益结束时间校验 */
export const validateEquityEndTime = (formData: ICouponTemplateFormData) => {
  return [
    {
      required: formData.equityEndType === EQUITY_END_TIME_TYPE.FIXED,
      message: '请选择失效日期',
    },
    {
      validator: (_rule: any, value: any, callback: any) => {
        if (
          formData.equityEndType === EQUITY_END_TIME_TYPE.FIXED
          && value
          && new Date(value).setHours(23, 59, 59, 59) < new Date(formData.endTime).getTime()
        ) {
          callback(new Error('请选择正确的权益失效日期'));
        } else {
          callback();
        }
      },
    },
  ];
};

/** 寄件重量校验 */
export const validateWeightRange = () => {
  return [
    {
      validator: (_rule: any, value: any, callback: any) => {
        if (value[0] === null || value[1] === null) {
          callback(new Error('请填写完整的时段区间'));
        } else {
          callback();
        }
      },
    },
  ];
};

/** 时段限制校验 */
export const validateLimitTime = () => {
  return [
    {
      validator: (_rule: any, value: any, callback: any) => {
        if ((value[0] === null && value[1] !== null) || (value[0] !== null && value[1]) === null) {
          callback(new Error('请填写完整的时段区间'));
        } else if (value[1] === 0) {
          callback(new Error('请填写正确的时段区间'));
        } else {
          callback();
        }
      },
    },
  ];
};

/** 寄件产品类型校验 */
export const validateSendProductType = (formRef: any) => {
  formRef.value?.validateField('sendProductType');
};
