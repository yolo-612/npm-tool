import '@/assets/styles/reset.css';
import '@/assets/styles/anim/index.css';
import '@/assets/styles/self-custom.css';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import directive from '@/directive/index'
import { useUserStore } from "@/stores"
import App from './App.vue'
import router from './router'
import { registerMicroApps, start } from 'qiankun';

window.console.log(
  `%c ${__APP_INFO__.pkg.name} ${__APP_INFO__.buildTime}`,
  'background:#DC1D32; padding:2px 3px; border:1px solid #DC1D32; border-radius:3px 0 0 3px; color:#fff;',
);

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

registerMicroApps([
  {
    name: 'app1',
    entry: '//localhost:5174',
    container: '#container',
    activeRule: '/app1',
  },
]);
// 启动 qiankun
start();