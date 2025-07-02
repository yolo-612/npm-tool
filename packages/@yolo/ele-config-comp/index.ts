import type { App, Plugin } from 'vue'
import TestVue from "./src/TestVue.vue"

const TestVueInstall : Plugin  = {
  install(app: App){
    app.component('test-vue', TestVue)
  }
}

export {
  TestVue,
  TestVueInstall,
}

export default function add(num: string, num2: string){
  return num + num2
}