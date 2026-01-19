import '@/assets/styles/reset.css';
import '@/assets/styles/anim/index.css';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import WujieVue from 'wujie-vue3';
import directive from '@/directive';
import { useSettingsStore, useUserStore } from '@/stores';

import App from './App.vue';
import router from './router';

window.console.log(
  `%c ${__APP_INFO__.pkg.name} ${__APP_INFO__.buildTime}`,
  'background:#DC1D32; padding:2px 3px; border:1px solid #DC1D32; border-radius:3px 0 0 3px; color:#fff;',
);

const app = createApp(App);
const pinia = createPinia();
pinia.use(createPersistedState({
  key: (id) => `pinia_${id}`,
}));
app.use(pinia);

// 加载插件，插件统一写在/plugins目录下面
const modules: any = import.meta.glob('./plugins/*.ts', { eager: true });
const sortModuleKeys:string[] = Object.keys(modules).sort((a, b) => a.localeCompare(b));
console.log('模块导入顺序====', sortModuleKeys);
sortModuleKeys.forEach((path) => {
  modules[path] && modules[path].default && modules[path].default({ router, app, pinia });
});

const userStore = useUserStore();

// 尽早初始化用户信息
// @ts-ignore
userStore.initUser();

const render = async () => {
  const settingsStore = useSettingsStore();
  settingsStore.updateTheme();
  await userStore.initUser();
  console.log('用户测试化成功====');
  app.use(router);
  app.use(directive);
  app.use(WujieVue);
  app.mount('#app');
};

render().catch((err) => {
  console.error(err);
});
