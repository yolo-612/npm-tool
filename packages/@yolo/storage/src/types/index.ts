type StorageType = 'local' | 'session' | 'indexedDB';

type StorageDataType = {
  _expire: number;
  _data: any;
}
interface IBaseFunc {
  getItem(key: string): Promise<any>;
  getItemSync(key: string): any;
  setItem(key: string, value: any, expire?: number): Promise<void>;
  setItemSync(key: string, value: any, expire?: number): void;
  removeItem(key: string): Promise<void>;
  removeItemSync(key: string): void;
  getKeys(): Promise<string[]>;
  getKeysSync(): string[];
}
