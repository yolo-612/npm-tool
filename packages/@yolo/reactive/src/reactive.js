class Observer{
  constructor(value){
    this.value = value;
    this.walk(value);
  }

  walk(value){
    Object.keys(value).forEach(key=>{
      defineReactive(value, key, value[key])
    })
  }
}

function defineReactive(obj, key, value){
  if(typeof value === 'object' && value !== null){
    observer(value)
  }
  Object.defineProperty(obj, key, {
    get: function(){
      console.log('你访问了'+ key)
      return value
    },
    set: function(newVal){
      if(newVal !== value){
        value = newVal
        if(typeof newVal === 'object' && newVal !== null){
          observer(newVal)
        }
        console.log('你设置了'+ key +', 新值为'+ newVal)
      }
    }
  })
  
}

export function observer(obj){
  if(typeof obj !== 'object' || obj === null){
    return
  }
  new Observer(obj)
}

let testReactive = {name: 'yolo', age: 18, info: {address: 'beijing'}} 
observer(testReactive)

console.log(testReactive.name, 'testReactive=====>');
console.log(testReactive.info.address, 'testReactive=====>');
testReactive.name = 'hello'
testReactive.info.address = 'shanghai'

