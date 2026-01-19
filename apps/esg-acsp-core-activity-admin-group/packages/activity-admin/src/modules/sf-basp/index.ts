import type { BaspModule } from './types';
import type { MenuItem } from '@/stores/modules/menu/types';

/**
 * 百源子系统名称'acsp-manager','acsp-integral-manager'
 */
export const BASP_SUB_SYSTEM_CODE = ['acsp-manager'];

/**
 * 格式化百源菜单数据，转换成前端需要的格式
 * @param menus
 */
export const baspMenusFormat = (menus: BaspModule[]): MenuItem[] => {
  if (!menus || menus.length === 0) return [];

  return menus.filter((item) => item.hidden !== 'N').map((item) => ({
    path: item.helpUrl,
    title: item.moduleName,
    icon: item.moduleIcon,
    children: baspMenusFormat(item.childModules),
    order: Number(item.sort),
  }));
};
