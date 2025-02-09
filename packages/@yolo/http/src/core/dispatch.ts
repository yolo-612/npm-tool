export default class Dispatch<T> {
  private taskMap = new Map<string, {
    time: number
    taskResult: T
  }>();

  private duration: number = 200;
  private maxCache: number = 10;

  constructor(duration: number = 200, maxCache: number = 10) {
    this.duration = duration;
    this.maxCache = maxCache;
  }

  runTask(key: string, task: () => T): T {
    if (this.taskMap.has(key)) {
      const existTask = this.taskMap.get(key);
      if (existTask && (Date.now() - existTask.time < this.duration)) {
        return existTask.taskResult;
      } else {
        this.taskMap.delete(key); // 过期立马删除
      }
    }
    // 避免缓存过多数据，超过最大个数就清理过期数据
    if (this.taskMap.size > this.maxCache) {
      this.clearExpireTask();
    }

    const taskResult = task();
    this.taskMap.set(key, {
      time: Date.now(),
      taskResult,
    })
    return taskResult;
  }
  clearExpireTask() {
    const expireLine = (Date.now() - this.duration)
    this.taskMap.forEach((value, key) => {
      if (value.time > expireLine) {
        this.taskMap.delete(key);
      }
    })
  }
}
