/**
 * 执行异步函数，返回promise
 * @param asyncFun
 * @return {Promise<never>|Promise|Promise<Awaited<*>>}
 */
export default function invokeAsyncFunction(asyncFun) {
  if (!(asyncFun instanceof Function)) {
    return Promise.reject(new Error('asyncFun必须为函数'));
  }
  try {
    const promiseFun = asyncFun();
    return promiseFun instanceof Promise ? promiseFun : Promise.resolve(promiseFun);
  } catch (err) {
    return Promise.reject(err);
  }
}
