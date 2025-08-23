import { MyVue } from './src/vue.js'

const data = {
  name: 'yolo',
  age: 18,
  counter: 0,
  desc: 'my vue is show',
  add: ()=>{

  }
}
const vm = new MyVue({
  el: '#app',
  data
})

setTimeout(()=>{
  data.desc = 'vue is change show'
}, 2000)

console.log(vm, 'vm=====>');