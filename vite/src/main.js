import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/reset.css'

import App from './App.vue'
import router from './router'
import { appUser } from '@/modules/user.js';
import { initMenus } from '@/modules/menu.js';
import { routes } from '@/router/routes.js';

// 尽早初始化用户信息
appUser.init().catch(err=>{
  console.error(err)
})

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
  initMenus(routes)
  app.use(router)
  app.mount('#app')

  console.log("router",router);

}

render().catch(err=>{
  console.error(err)
})