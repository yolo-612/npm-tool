import '@/assets/styles/reset.css';
import App from './App.vue'
import router from './router'
import { useUserStore } from "@/stores"
import directive from '@/directive/index'
import { createPersistedState } from 'pinia-plugin-persistedstate';

const app = createApp(App)
const pinia = createPinia()
pinia.use(createPersistedState({
  key: (id) => `pinia_${id}`,
}))
app.use(pinia)


// 加载插件，插件统一写在/plugins目录下面
const modules = import.meta.glob('./plugins/*.ts',{ eager: true })
for (const path in modules) {
  modules[path] && modules[path].default && modules[path].default({router,app,pinia});
}

const userStore = useUserStore()
// 尽早初始化用户信息
// @ts-ignore
userStore.initUser()

const render = async ()=>{
  app.use(router)
  app.mount('#app')
  app.use(directive)
}

render().catch(err=>{
  console.error(err)
})