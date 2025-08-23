import { Dep } from './dep.js'
export class Watcher{
  /**
   * @param {*} vm vue 实例
   * @param {*} key Watcher实例对应的 data.key
   * @param {*} cb 更新函数
   */
  constructor(vm, key, updateFn){
    this.vm = vm;
    this.key = key;
    this.updateFn = updateFn

    // 触发依赖收集 把当前 Watcher 赋值给 Dep 的静态属性 target
    Dep.target = this
    // 故意读一下 data.key 的值 为了触发 defineReactive 中的 get
    this.vm[this.key]
    // 收集依赖以后 再置为null
    Dep.target = null
  }

  // 更新方法 未来被 Dep 调用
  update(){
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}