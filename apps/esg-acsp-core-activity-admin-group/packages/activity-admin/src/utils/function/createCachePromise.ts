export type cachePromiseFunction = (refresh?: boolean) => Promise<unknown>;

/**
 * 生成缓存promise
 * @param {function} promiseFn
 * @return {function}
 */
export default function createCachePromise(promiseFn: Function): cachePromiseFunction {
  let _promise: Promise<unknown> | null = null;

  /**
   * 是否刷新
   */
  return function (refresh = false) {
    if (_promise && !refresh) {
      return _promise;
    }

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    _promise = promiseFn.call(this);

    if (!(_promise instanceof Promise)) {
      _promise = Promise.resolve(_promise);
    }

    return _promise;
  };
}
