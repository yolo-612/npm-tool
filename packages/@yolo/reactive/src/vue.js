import { observer } from './reactive.js'
import { Compile } from './compile.js'

function proxy(vm){
  Object.keys(vm.$data).forEach(key=>{
    // 若直接赋值操作：
    // vm.$data改变 无法 同步到 vm
    // vm的改变也不会同步到 vm.$data
    // vm[key] = vm.$data[key]

    Object.defineProperty(vm, key, {
      get: function(){
        return vm.$data[key]
      },
      set: function(newVal){
        vm.$data[key] = newVal  
      }
    })

  })
}

export class MyVue {
  constructor(options){
    this.$options = options || {}
    this.$data = options.data || {}

    // 数据劫持
    observer(this.$data)

    // 代理数据到实例
    proxy(this)

    // 编译模板
    new Compile(options.el, this)
  }
}