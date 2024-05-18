/**
 * 生成请求的唯一key
 * @param url 请求url
 * @param method 请求类型
 * @param params 请求参数
 * @param retryTimes 请求的第几次重试，重试的请求需认为是新的请求
 * @returns
 */
const genUnionKey = (url: string = '', method: string = '', params: Record<string, any> | number | string | boolean, retryTimes: number = 0) => {
  const query = typeof params === 'object'
    ? Object.keys(params).sort().map((key) => `${key}${JSON.stringify(params[key])}`).join('')
    : JSON.stringify(params);
  return `${url}${method}${query}${retryTimes}`;
}

export {
  genUnionKey,
}
