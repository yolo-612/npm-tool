export class Dep {
  constructor(){
    this.deps = [];
  }

  addDep(dep){
    this.deps.push(dep)
  }

  // 通知所有的 Watchers 进行更新 这里的 dep 指的就是收集起来的 Watcher
  notify(){
    this.deps.forEach(dep => dep.update())
  }
}