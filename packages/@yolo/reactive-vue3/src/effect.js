let activeEffect = null;
let targetMaps = new WeakMap();

// 收集依赖
export function track(target, key){
  if(!activeEffect) return
  let depsMap = targetMaps.get(target);
  if(!depsMap){
    depsMap = new Map()
    targetMaps.set(target, depsMap)
  }

  let deps = depsMap.get(key)
  if(!deps){
    deps = new Set()
    depsMap.set(key, deps)
  }

  deps.add(activeEffect)
}

// 触发更新
export function trigger(target, key){
  const depsMap = targetMaps.get(target)

  if(!depsMap) return

  const deps = depsMap.get(key);

  if(!deps) return

  deps.forEach((fn)=> fn())
}

export function effect(fn){
  try{
    activeEffect = fn
    fn()
  } finally{
    activeEffect = null
  }
}