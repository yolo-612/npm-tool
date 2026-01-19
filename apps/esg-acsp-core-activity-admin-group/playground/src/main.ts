import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import '@fpkg/components-web/dist/lib/style.css';
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import ComponentsWeb from '@fpkg/components-web'

createApp(App).use(router).use(ElementPlus).use(ComponentsWeb).mount('#app')
