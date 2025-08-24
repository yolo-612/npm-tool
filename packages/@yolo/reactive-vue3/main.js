import { reactive } from './src/reactive.js'
import { effect } from './src/effect.js'

const state = reactive({
  name: 'yolo',
  info: {
    age: 10,
    address: 'anhui'
  }
})

console.log(state, '=----> reactive state')
effect(()=>{
  console.log(state.name)
})

setTimeout(()=>{
  state.name = 'yolo2'
}, 2000)