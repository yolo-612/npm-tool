import { MyVue } from './src/vue.js'
const vm = new MyVue({
  el: '#app',
  data: {
    name: 'yolo',
    age: 18,
    counter: 0,
    desc: 'my vue is show',
    add: ()=>{

    }
  }
})

console.log(vm, 'vm=====>');