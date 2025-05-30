import type { DirectiveBinding } from 'vue';
import usePermission from '@/hook/usePermission';

/**
 * 自定义权限指令,指令值参考checkPermissionAll函数
 * @type {{}}
 */
export default {
  // 在元素被插入到 DOM 前调用
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // value 获取用户使用自定义指令绑定的内容
    const { value } = binding;

    if (!usePermission().checkPermissionAll(value) && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  },
};
