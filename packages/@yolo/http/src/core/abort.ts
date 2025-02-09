class Abort {
  abortControllerMap = new Map<string, any[]>
  addController(key: string, abortController: any) {
    let controllerList: any[] = [];
    if (this.abortControllerMap.has(key)) {
      controllerList = this.abortControllerMap.get(key) || [];
    }

    controllerList.push(abortController)
    this.abortControllerMap.set(key, controllerList);
  }
  abort(key: string) {
    if (key && this.abortControllerMap.has(key)) {
      (this.abortControllerMap.get(key) || []).forEach(item => item.abort && item.abort());
      this.abortControllerMap.delete(key);
    }
  }
}

export default new Abort();
