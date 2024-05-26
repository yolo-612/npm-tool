class IndexedDB implements IBaseFunc{
  private db: IDBDatabase | null = null;
  private dbName: string = '';
  private version: number = 1;
  private storeName: string = '';

  constructor(dbName: string = '@YOLO_STORAGE', version: number = 1, storeName: string = 'store') {
    this.dbName = dbName;
    this.version = version;
    this.storeName = storeName;
  }
  static isSupport(): boolean {
    // @ts-ignore
    return !!(window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedD);
  }

  init(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
      } else {
        // @ts-ignore
        const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

        const request = indexedDB.open(this.dbName, this.version);
        request.onerror = (e) => {
          console.error('indexedDB 初始化失败', e);
          reject(e);
        };
        request.onsuccess = () => {
          this.db = request.result;
          resolve(this.db);
        };
        request.onupgradeneeded = () => {
          this.db = request.result;
          if (!this.db.objectStoreNames.contains(this.storeName)) {
            this.db.createObjectStore(this.storeName, { keyPath: 'key' });
          }
        };
      }
    });
  }
  getItem(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.init().then((db) => {
        const transaction = db.transaction([this.storeName]);
        const store = transaction.objectStore(this.storeName);
        const request = store.get(key);
        request.onsuccess = () => {
          if (request.result && request.result.value) {
            resolve(request.result.value);
          } else {
            resolve(null);
          }
        };
        request.onerror = (e) => {
          reject(e);
        };
      }, e => reject(e));
    });
  }
  getItemSync(key: string): any {
    console.error('indexedDB不支持同步操作', key);
  }
  setItem(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.init().then((db) => {
        const transaction = db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.put({ key, value });
        request.onsuccess = () => {
          resolve();
        };
        request.onerror = (e) => {
          reject(e);
        };
      }, e => reject(e));
    });
  }
  setItemSync(key: string, value: any): void {
    console.error('indexedDB不支持同步操作', key, value);
  }
  removeItem(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.init().then((db) => {
        const transaction = db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.delete(key);
        request.onsuccess = () => {
          resolve();
        };
        request.onerror = (e) => {
          reject(e);
        };
      }, e => reject(e));
    });
  }
  removeItemSync(key: string): void {
    console.error('indexedDB不支持同步操作', key);
  }
  getKeys(): Promise<string[]> {
    const list: string[] = [];
    return new Promise((resolve, reject) => {
      this.init().then((db) => {
        const transaction = db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.openCursor();
        request.onsuccess = (e) => {
          // @ts-ignore
          const cursor = (e && e.target && e.target.result) ? e.target.result : null;
          if (cursor) {
            // 必须要检查
            list.push(cursor.key);
            cursor.continue(); // 遍历了存储对象中的所有内容
          } else {
            resolve(list);
          }
        };
        request.onerror = (e) => {
          reject(e);
        };
      }, e => reject(e));
    });
  }
  getKeysSync(): string[] {
    console.error('indexedDB不支持同步操作');
    return [];
  }
}

export default IndexedDB;
