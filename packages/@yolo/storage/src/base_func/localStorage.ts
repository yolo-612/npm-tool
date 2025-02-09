class LocalStorage implements IBaseFunc {
  /**
   * 获取localStorage缓存
   * @param key
   * @returns
   */
  getItem(key: string): Promise<any> {
    return Promise.resolve(localStorage.getItem(key));
  }
  getItemSync(key: string): any {
    return localStorage.getItem(key);
  }

  /**
   * 设置localStorage缓存
   * @param key
   * @param value
   * @returns
   */
  setItem(key: string, value: any): Promise<void> {
    return Promise.resolve(localStorage.setItem(key, JSON.stringify(value)));
  }
  setItemSync(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 删除localStorage缓存
   * @param key
   * @returns
   */
  removeItem(key: string): Promise<void> {
    return Promise.resolve(localStorage.removeItem(key));
  }
  removeItemSync(key: string): void {
    return localStorage.removeItem(key);
  }

  /**
   * 获取localStorage所有key
   * @returns
   */
  getKeys(): Promise<string[]> {
    return Promise.resolve(Object.keys(localStorage));
  }
  getKeysSync(): string[] {
    return Object.keys(localStorage);
  }
}

export default LocalStorage
