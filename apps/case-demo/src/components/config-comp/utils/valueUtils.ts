/**
 * 判断value是否为空字符串/null/undefined
 */
export const isEmptyValue = (value: any): value is null | undefined | '' => {
  if (
    (!value
      || typeof value !== 'string'
      || value.trim() === ''
      || value.trim().toLowerCase() === 'undefined'
      || value.trim().toLowerCase() === 'null')
    && typeof value !== 'number'
  ) {
    return true;
  }
  return false;
};

/**
 * 判断value是否为 null/undefined
 */
export const isNil = (value: any): boolean => {
  return value === null || value === undefined;
};
