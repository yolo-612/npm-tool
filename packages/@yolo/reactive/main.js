import { MyVue } from './src/vue.js'
const vm = new MyVue({
  el: '#app',
  data: {
    name: 'yolo',
    age: 18
  }
})

console.log(vm, 'vm=====>');