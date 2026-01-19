import { PERIOD_OPTION } from './map';

/**
 * 将权益的周期转为活动的周期规范
 * @param rangeRule 权益周期
 */
export function convertRightsRangeRule(rangeRule: number[]) {
  const weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const rightsWeeks = rangeRule.map((item) => weeks[item - 1]);

  return rightsWeeks.map((day) => {
    return PERIOD_OPTION.filter((item) => item.label === day)[0].value;
  });
}

/**
 * 将时段限制从string-hour-range 转换为 number range
 * @param limitTime ['6:00', '14:59']
 * @returns
 */
export const convertLimitTimeToNumberRange = (limitTime: string[]) => {
  if (!limitTime || !limitTime.length) return [];
  const [start, end] = limitTime;
  const startLimitTime = Number(start?.split(':')[0]);
  const endLimitTime = Number(end?.split(':')[0]) + 1;
  return [startLimitTime, endLimitTime];
};

/**
 * 将数组转为number数组
 */
export const convertArrayToNumber = (arr: any[]): number[] => {
  if (arr && Array.isArray(arr)) return arr.map(Number);
  return [];
};

/**
 * 将时段限制从number range转换为 string-hour-range
 * @param limitTime [6, 14]
 */
export const convertLimitTimeToStringRange = (limitTime: (number | null)[]) => {
  if (!limitTime.length) return [];
  const padZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };
  const [startHour, endHour] = toRaw(limitTime);
  if (startHour === null && endHour === null) return [];
  const startLimitTime = startHour !== null ? `${padZero(startHour)}:00:00` : null;
  const endLimitTime = endHour !== null ? `${padZero(endHour - 1)}:59:59` : null;
  return [startLimitTime, endLimitTime];
};

/** 判断城市流向是否相等 */
export const areArrayEqualIgnoreOrder = (val1: any[], val2: any[]) => {
  if (Array.isArray(val1) && Array.isArray(val2)) {
    if (val1.length !== val2.length) return false;
    // 将数组元素转换为标准格式以便比较（这里将sourceDistCode和targetDistCode数组排序后拼接成字符串）
    const formattedVal1 = val1.map((item) => {
      const sortedSource = item.sourceDistCode.sort().join('');
      const sortedTarget = item.targetDistCode.sort().join('');
      return `${sortedSource}-${sortedTarget}`;
    });
    const formattedVal2 = val2.map((item) => {
      const sortedSource = item.sourceDistCode.sort().join('');
      const sortedTarget = item.targetDistCode.sort().join('');
      return `${sortedSource}-${sortedTarget}`;
    });
    // 对转换后的标准格式数组进行排序
    const sortedFormattedVal1 = formattedVal1.sort();
    const sortedFormattedVal2 = formattedVal2.sort();
    for (let i = 0; i < sortedFormattedVal1.length; i++) {
      if (sortedFormattedVal1[i] !== sortedFormattedVal2[i]) return false;
    }
    return true;
  }
  return false;
};
