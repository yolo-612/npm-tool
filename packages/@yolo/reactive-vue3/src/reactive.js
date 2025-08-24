import { track, trigger } from './effect.js'


export function reactive(target){
  return new Proxy(target, {
    get(obj, key){
      const result = Reflect.get(obj, key)
      track(obj, key)
      return typeof result === 'object' ? reactive(result) : result
    },
    set(obj, key, value){
      const oldValue = obj[key]
      const result = Reflect.set(obj, key, value)
      if(oldValue !== value){
        trigger(obj, key)
      }
      return result
    }
  })
}