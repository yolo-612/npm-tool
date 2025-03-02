export type forEachDeepCallback<T extends Object> = (item: T, parent: T | undefined) => undefined | boolean;

function forEach<T extends Object>(
  tree: T[],
  func: forEachDeepCallback<T>,
  parent: T | undefined,
  childrenKey: string,
) {
  if (!tree || tree.length === 0 || !func) return;

  tree.forEach((item) => {
    const res:any = func(item, parent);
    if (res === true) {
      // 回调函数返回true，不再遍历children
      return;
    }

    if (childrenKey && childrenKey in item && (item as any)[childrenKey]) {
      forEach((item as any)[childrenKey], func, item, childrenKey);
    }
  });
}

/**
 * 深度遍历集合
 * @param tree 被遍历的集合
 * @param func 回调函数
 * @param childrenKey 子元素key
 */
export default function forEachDeep<T extends Object>(
  tree: T[],
  func: forEachDeepCallback<T>,
  childrenKey = 'children',
) {
  forEach<T>(tree, func, undefined, childrenKey);
}
