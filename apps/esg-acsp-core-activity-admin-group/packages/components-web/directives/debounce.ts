import type { DirectiveBinding } from 'vue';

export default {
  mounted(el: any, binding: DirectiveBinding<number>) {
    if (typeof binding.value !== 'number' || !binding.value) return;

    const duration = binding.value || 1000;
    const handler = () => {
      el.disabled = true; // 禁用按钮
      el.classList.add('is-disabled');
      setTimeout(() => {
        el.disabled = false; // 一定时间后重新启用按钮
        el.classList.remove('is-disabled');
      }, duration);
    };

    el.addEventListener('click', handler);

    // @ts-ignore  清除定时器
    el._debounceTimeout = handler;
  },
  unmounted(el: any) {
    if (!el._debounceTimeout) return;
    // @ts-ignore  清除定时器
    el.removeEventListener('click', el._debounceTimeout);
  },
};
