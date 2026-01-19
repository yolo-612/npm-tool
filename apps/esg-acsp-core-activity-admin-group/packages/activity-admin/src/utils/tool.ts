/**
 * 判断两个数据是否相等
 * @param val1
 * @param val2
 */
export function areValuesEqual(val1: any, val2: any): boolean {
  const type1 = typeof val1;
  const type2 = typeof val2;

  // 判断类型是否相同
  if (type1 !== type2) return false;

  // 处理 undefined
  if (type1 === 'undefined') return true;

  // 处理简单数据类型(除null外)
  if (type1 !== 'object') return val1 === val2;

  // 处理null
  if (val1 === null && val2 === null) return true;

  // 处理数组
  if (Array.isArray(val1) && Array.isArray(val2)) {
    if (val1.length !== val2.length) return false;
    for (let i = 0; i < val1.length; i++) {
      if (!areValuesEqual(val1[i], val2[i])) return false;
    }
    return true;
  }

  // 处理对象
  if (typeof val1 === 'object') {
    const keys1 = Object.keys(val1);
    const keys2 = Object.keys(val2);
    if (keys1.length !== keys2.length) return false;
    for (let i = 0; i < keys1.length; i++) {
      const key = keys1[i];
      if (!areValuesEqual(val1[key], val2[keys2[i]])) return false;
    }
    return true;
  }

  return false;
}

/**
 * 获取图片的宽高
 * @param file 上传资源
 * @returns 返回宽高
 */
export const uGetImageDimensions = (file: File) => {
  return new Promise((resolve, reject) => {
    const dom = document.createElement('img');
    dom.src = URL.createObjectURL(file);
    dom.onload = () => {
      const { width, height } = dom;
      dom.remove();
      resolve({ width, height });
    };
    dom.onerror = () => {
      dom.remove();
      reject(new Error('读取图片宽高失败'));
    };
  });
};

/** 模糊搜索 */
export const fuzzySearch = (input: string, list: any[], searchKey = 'label') => {
  const target = input.trim();
  if (!list?.length) return [];
  if (!target) return list;
  return list.filter((item) => item[searchKey].includes(target));
};

/** 处理起始时间 */
export const formatRangeTime = (range: string[]) => {
  if (!range || !range?.length) return [];
  const [start, end] = range || [];
  const sTime = start ? `${start} 00:00:00` : '';
  const eTime = end ? `${end} 23:59:59` : '';
  return [sTime, eTime];
};

/**
 * 下载文件
 * @param url 文件 url
 * @param fileName 文件名
 */
export const downloadFile = (url: string, fileName: string) => {
  // 创建一个隐藏的 <a> 标签
  const a = document.createElement('a');
  a.href = url; // 设置下载链接
  a.download = fileName; // 设置下载的文件名
  document.body.appendChild(a); // 将 <a> 标签添加到 DOM 中
  a.click(); // 触发点击事件
  document.body.removeChild(a); // 移除 <a> 标签
};
