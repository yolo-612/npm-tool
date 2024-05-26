class SessionStorage implements IBaseFunc {
  /**
 * 获取sessionStorage缓存
 * @param key
 * @returns
 */
  getItemSync(key: string): any {
    return sessionStorage.getItem(key);
  }
  getItem(key: string): Promise<any> {
    return Promise.resolve(this.getItemSync(key));
  }

  /**
   * 设置sessionStorage缓存
   * @param key
   * @param value
   */
  setItemSync(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  setItem(key: string, value: any): Promise<void> {
    return Promise.resolve(this.setItemSync(key, value));
  }

  /**
   * 删除sessionStorage缓存
   * @param key
   */
  removeItemSync(key: string): void {
    sessionStorage.removeItem(key);
  }
  removeItem(key: string): Promise<void> {
    return Promise.resolve(this.removeItemSync(key));
  }

  /**
   * 获取sessionStorage所有key, 小程序渠道 session 挂载在全局变量上
   */
  getKeysSync(): string[] {
    return Object.keys(sessionStorage);
  }
  getKeys(): Promise<string[]> {
    return Promise.resolve(this.getKeysSync());
  }
};

export default SessionStorage;
