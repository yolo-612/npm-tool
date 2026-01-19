/**
 * 执行异步函数，返回promise
 */
export default function invokeAsyncFunction(asyncFun: any) {
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
