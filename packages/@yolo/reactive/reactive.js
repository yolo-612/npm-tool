function updated(value){
  const appDom = document.getElementById('app')
  appDom.innerHTML = value
}


function observe(obj){
  if(typeof obj !== 'object' || obj === null){
    return
  }

  Object.entries(obj).forEach(([key, value])=>{
    if(typeof value === 'object'){
      observe(value)
    } else {
      Object.defineProperty(obj, key, {
        get: function(){
          console.log('get', key, value)
          return value
        },
        set: function(newVal){
          if(newVal !== value){
            console.log('set', key, newVal, value)
            value = newVal
            updated(value)
          }
        }
      })
    }
  })
}

const obj1 = {
  name: 'yolo',
  age: 18,
  friends: [{
    key: 'xxx1',
    value: 'yyy1'
  }] 
}

observe(obj1)

setTimeout(() => {
  obj1.name = 'yolo2'
}, 1000)

setTimeout(() => {
  obj1.friends[0].key = 'zzzzzz1'
}, 2000)

