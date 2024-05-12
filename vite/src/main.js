import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/reset.css'
import App from './App.vue'
import router from './router'
import { appUser } from '@/modules/user.js';

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)


// 加载插件，插件统一写在/plugins目录下面
const modules = import.meta.glob('./plugins/*.js',{ eager: true })
for (const path in modules) {
  modules[path] && modules[path].default && modules[path].default({router,app,pinia});
}

const render = async ()=>{
  await appUser.init()
  app.use(router)
  app.mount('#app')
}

render().catch(err=>{
  console.error(err)
})