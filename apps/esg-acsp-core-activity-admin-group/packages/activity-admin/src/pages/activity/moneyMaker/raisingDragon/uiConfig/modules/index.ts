/**
 * @description 表单的数据
 */

import type { IFormType, ISubFormType } from '../composables/types';
import { getData } from './data';
import { getRules } from './rules';
import { getTimes } from './items';

/** 导出 template style  的配置 */
export * as templateStyleConfig from './templateStyleConfig';

/** 导出类型 */
export type { IFormType, ISubFormType };

/**
 * 获取基本对象数据以及 form item 数据
 * @returns form 数据
 */
export const getFromData = (type: string) => {
  return {
    formData: getData(type),
    formItemList: getTimes(type),
    rulesData: getRules(type),
  };
};
