/**
 * 是否为空数组
 */
export const isEmptyArray = (value: any) => {
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  return false;
};
