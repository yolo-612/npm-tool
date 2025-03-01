import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PgKit from '@yolo/pg-kit'
import "@yolo/pg-kit/dist/index.css"
import ElementPlus from '@yolo/element-plus'
import '@yolo/element-plus/dist/index.css'


const app = createApp(App) 
app.use(PgKit)
ElementPlus.install(app, {})
app.mount('#app')
