import IndexedDBClass from './indexDB';
import SessionStorage from './sessionStorage';
import LocalStorage from './localStorage';

const Session: IBaseFunc = new SessionStorage();
const Local: IBaseFunc = new LocalStorage();

let IndexedDB;
if (IndexedDBClass.isSupport()) {
  IndexedDB = new IndexedDBClass();
} else {
  IndexedDB = Local; // 不支持indexedDB的渠道使用localStorage
}

function getFuncsByType(type: StorageType): IBaseFunc {
  if (type === 'local') {
    return Local;
  } else if (type === 'indexedDB') {
    return IndexedDB;
  } else {
    return Session;
  }
}

export {
  getFuncsByType
}
