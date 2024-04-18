import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/reset.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

// 加载插件，插件统一写在/plugins目录下面
const modules = import.meta.glob('./plugins/*.js',{ eager: true })
for (const path in modules) {
  modules[path] && modules[path].default && modules[path].default({router,app,pinia});
}

app.use(pinia)
app.use(router)

app.mount('#app')
