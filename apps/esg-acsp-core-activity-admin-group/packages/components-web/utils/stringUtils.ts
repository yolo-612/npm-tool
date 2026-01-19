/**
 * 字符串是否为空
 */
export const isEmpty = (value: any): boolean => {
  if (
    !value
    || typeof value !== 'string'
    || value.trim() === ''
    || value.trim().toLowerCase() === 'undefined'
    || value.trim().toLowerCase() === 'null'
  ) {
    return true;
  }
  return false;
};

/**
 *  返回字符串对象
 * @param value 任意需要类型
 * 若value为字符串则返回value，若不是则返回空字符串
 */
export const stringValue = (value: any): string => {
  if (typeof value === 'number') {
    return value.toString();
  }
  if (isEmpty(value)) {
    return '';
  }
  return value;
};
