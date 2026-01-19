import type { DirectiveBinding, ObjectDirective } from 'vue';

const Resize: ObjectDirective = {
  mounted(el: any, binding: DirectiveBinding) {
    // binding:数据对象
    //   + arg:传给指令的参数   v-xxx:n -> arg:"n"
    //   + modifiers:修饰符对象 v-xxx.stop -> modifiers:{stop:true}
    //   + value:指令绑定的值   v-xxx="1+1" -> value:2
    //   + oldValue:之前绑定的值

    const handler = binding.value;
    // const options = {
    //   passive: !binding.modifiers?.active
    // }
    if (handler) {
      window.addEventListener('resize', handler);
    }
    el._onResize = handler;
  },
  unmounted(el: any) {
    if (!el._onResize) {
      return;
    }
    window.removeEventListener('resize', el._onResize);
    delete el._onResize;
  },
};

export default Resize;
