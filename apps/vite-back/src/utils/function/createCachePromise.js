
/**
 * 生成缓存promise
 * @param {function} promiseFn
 * @return {function}
 */
export default function createCachePromise(promiseFn){
  let _promise = null

  /**
   * 是否刷新
   */
  return function(refresh = false){
    if(_promise && !refresh){
      return _promise
    }

    _promise = promiseFn.call(this)

    if(!(_promise instanceof Promise)){
      _promise = Promise.resolve(_promise)
    }

    return _promise
  }
}
