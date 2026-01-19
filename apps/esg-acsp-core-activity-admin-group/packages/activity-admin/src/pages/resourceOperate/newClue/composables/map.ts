/**
 * 客户管理相关
*/
import dayjs from 'dayjs';


// 范围标识Map
export enum RANGE_MAP {
  area =  0, // 区
  division = 1, // 分部
  part = 2, // 业务部
  dept = 3, // 网点
};


/* 获取月份 */
/* 月份选择状态 */
export function getMonthList() {
  const option = [];
  const current = dayjs();
  for(let i = 0; i <= 12; i++){
    const month = current.subtract(i, 'month').format('YYYYMM'); 
    option.push({
      label: month,
      value: month,
    });
  }
  return option;
}