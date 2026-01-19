/**
 * 防抖
 * 在期限值内没有触发某个操作，则执行函数，期限之内再次触发某个操作，重置期限值
 * @param func 要防抖的函数
 * @param delay 防抖期限值，ms
 * @param immediate 是否立即执行,默认否，true：先执行函数，delay时间内不再响应函数执行；false：在delay时间后执行函数，如果中途再次调用，则delay被重置
 */
export const debounceFn = (fn: Function, delay = 1000, immediate = false):any => {
  if (immediate) {
    let block = false;
    return function (...args: any) {
      if (!block) {
        block = true;
        // @ts-ignore
        fn.apply(this, args);
        setTimeout(() => { block = false; }, delay);
      }
      // eslint-disable-next-line
    }.bind(this);
  } else {
    let timer: any = null;
    return function (...args: any) {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        // @ts-ignore
        fn.apply(this, args);
      }, delay);
      // eslint-disable-next-line
    }.bind(this);
  }
};

/* 提取响应式的值 */
export const recompute = <T>(prop: MaybeRefOrGetter<T>): T => {
  if (toValue) return toValue(prop);
  /* 3.3以下处理方式 */
  if (typeof prop === 'function') return (prop as ()=>T)();
  return unref(prop);
};
