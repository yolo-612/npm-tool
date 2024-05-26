import { getFuncsByType } from './base_func';
import { isExpire } from './utils'

const PRIVATE_KEY_PREFIX = '_@yolo_';

function genPrivateKey(key) {
  return `${PRIVATE_KEY_PREFIX}${key}`;
}

function removeItemSync(key: string, options?: {
  type: StorageType
}): void {
  const privateKey = genPrivateKey(key);
  const { type = 'local' } = options || {};
  getFuncsByType(type).removeItemSync(privateKey);
}
function removeItem(key: string, options?: {
  type: StorageType
}): Promise<void> {
  const privateKey = genPrivateKey(key);
  const { type = 'local' } = options || {};
  return getFuncsByType(type).removeItem(privateKey);
}


function clearExpireItemsSync(options?: {
  type: StorageType
}) {
  const { type = 'local' } = options || {};
  const funcs = getFuncsByType(type);
  const keys = funcs.getKeysSync();
  keys.forEach(privateKey => {
    let data: any = getItemFromPrivate(privateKey, type);
    if (!data || !data._expire || isExpire(data._expire)) {
      funcs.removeItemSync(privateKey);
    }
  })
}

function clearExpireItems(options?: {
  type: StorageType
}) {
  const { type = 'local' } = options || {};
  const funcs = getFuncsByType(type);
  const keys = funcs.getKeysSync();
  const removeTaskList: any = [];
  keys.forEach(privateKey => {
    let data: any = getItemFromPrivate(privateKey, type);
    if (!data || !data._expire || isExpire(data._expire)) {
      removeTaskList.push(funcs.removeItem(privateKey));
    }
  })
  return Promise.all(removeTaskList);
}

function clearAll(options?: {
  type: StorageType
}) {
  const { type = 'local' } = options || {};
  const funcs = getFuncsByType(type);
  const keys = funcs.getKeysSync();
  return Promise.all(keys.map(privateKey => funcs.removeItemSync(privateKey)));
}

function clearAllSync(options?: {
  type: StorageType
}) {
  const { type = 'local' } = options || {};
  const funcs = getFuncsByType(type);
  const keys = funcs.getKeysSync();
  keys.forEach(privateKey => {
    funcs.removeItemSync(privateKey);
  })
}

/**
 * 获取不是本组件写的缓存
 */
function getItemFromOthersSync(key: string, type: StorageType): any {
  let result: any = null;
  const value = getFuncsByType(type).getItemSync(key);
  try {
    if (typeof value === 'string') {
      result = JSON.parse(value);
    } else {
      result = value
    }
  } catch (e) {
    // 不是通过本组件操作的缓存，若解析失败，返回原值。典型场景是缓存的一个字符串。
    console.info('[@yolo/storage]', e);
    result = value
  }

  return result;
}
async function getItemFromOthers(key: string, type: StorageType): Promise<any> {
  let result: any = null;
  const value = await getFuncsByType(type).getItem(key);
  try {
    if (typeof value === 'string') {
      result = JSON.parse(value);
    } else {
      result = value
    }
  } catch (e) {
    // 不是通过本组件操作的缓存，若解析失败，返回原值。典型场景是缓存的一个字符串。
    console.info('[@yolo/storage]', e);
    result = value
  }
  return result;
}

/**
 * 获取本组件写的缓存
 */
function getItemFromPrivateSync(key: string, type: StorageType): any {
  let result: any = null;
  const value = getFuncsByType(type).getItemSync(key);
  try {
    if (typeof value === 'string') {
      result = JSON.parse(value);
    } else {
      result = value
    }
  } catch (e) {
    // 通过本组件操作的缓存正常情况下不会parse失败，失败则认为是数据被污染，返回null
    console.error('[@yolo/storage] JSON.parse缓存数据失败', value, e);
    result = null;
  }
  return result;
}
async function getItemFromPrivate(key: string, type: StorageType): Promise<any> {
  let result: any = null;
  const value = await getFuncsByType(type).getItem(key);
  try {
    if (typeof value === 'string') {
      result = JSON.parse(value);
    } else {
      result = value
    }
  } catch (e) {
    // 通过本组件操作的缓存正常情况下不会parse失败，失败则认为是数据被污染，返回null
    console.error('[@yolo/storage] JSON.parse缓存数据失败', value, e);
    result = null;
  }
  return result;
}

function getItemSync(key: string, options?: {
  type: StorageType
}): any {
  const { type = 'local' } = options || {};
  const privateKey = genPrivateKey(key);
  let result: any = null;

  let data: any = getItemFromPrivateSync(privateKey, type); // 优先从本组件维护的缓存中取
  if (data) {
    if (data._expire && !isExpire(data._expire)) {
      result = data._data;
    } else {
      result = null;
      removeItemSync(key, { type }); // 过期数据删除
    }
  } else {
    // 本组件维护的缓存没有（包括过期数据），则兼容直接调用api写入的情况(历史数据)
    result = getItemFromOthersSync(key, type);
  }

  return result;
}
async function getItem(key: string, options?: {
  type: StorageType
}): Promise<any> {
  const { type = 'local' } = options || {};
  const privateKey = genPrivateKey(key);
  let result: any = null;

  let data = await getItemFromPrivate(privateKey, type); // 优先从本组件维护的缓存中取
  if (data) {
    if (data._expire && !isExpire(data._expire)) {
      result = data._data;
    } else {
      result = null;
      await removeItem(key, { type }); // 过期数据删除
    }
  } else {
    // 本组件维护的缓存没有（包括过期数据），则兼容直接调用api写入的情况(历史数据)
    result = await getItemFromOthers(key, type);
  }

  return result;
}

async function setItem(key: string, value: any, options?: {
  type?: StorageType;
  expire?: number;
  merge?: boolean;
}): Promise<void> {
  const { type = 'local', expire = -1, merge = false } = options || {};
  const privateKey = genPrivateKey(key);
  const saveValue = {
    _expire: expire,
    _data: value,
  }

  if (merge) {
    const oldVal = await getItem(key, { type });
    if (oldVal && typeof oldVal === 'object') {
      saveValue._data = Object.assign(oldVal, value);
    }
  }
  await getFuncsByType(type).setItem(privateKey, saveValue);
}

function setItemSync(key: string, value: any, options?: {
  type?: StorageType;
  expire?: number;
  merge?: boolean;
}): void {
  const { type = 'local', expire = -1, merge = false } = options || {};
  const privateKey = genPrivateKey(key);
  const saveValue = {
    _expire: expire,
    _data: value,
  }

  if (merge) {
    const oldVal = getItemSync(key, { type });
    if (oldVal && typeof oldVal === 'object') {
      saveValue._data = Object.assign(oldVal, value);
    }
  }
  getFuncsByType(type).setItemSync(privateKey, saveValue);
}

export {
  getItem,
  getItemSync,
  setItem,
  setItemSync,
  removeItem,
  removeItemSync,

  clearExpireItems,
  clearExpireItemsSync,
  clearAll,
  clearAllSync,
}
