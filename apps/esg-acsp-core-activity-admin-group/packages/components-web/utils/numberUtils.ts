/**
 * 转为数字
 */
export const numberValue = (value?: string | number): number => {
  if (value) {
    try {
      return Number(value);
    } catch (e) {}
  }
  return 0;
};

/**
 * 将数字或者数字字符串转换为带千分位的数字字符串
 * @param value
 */
export const numberWithCommas = (value: string | number): string => {
  let numberValue: number;

  if (typeof value === 'string') {
    numberValue = parseFloat(value);
  } else {
    numberValue = value;
  }

  if (isNaN(numberValue)) {
    throw new Error('Invalid input. Only strings and numbers are allowed.');
  }

  return numberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
