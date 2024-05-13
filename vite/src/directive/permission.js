import usePermission from '@/hook/usePermission';

/**
 * 自定义权限指令,指令值参考checkPermission函数
 * @type {{}}
 */
export default {
  // 在元素被插入到 DOM 前调用
  mounted(el, binding) {
    // value 获取用户使用自定义指令绑定的内容
    const { value } = binding

    if(!usePermission().checkPermission(value) && el.parentNode){
      el.parentNode.removeChild(el);
    }
  },
}
