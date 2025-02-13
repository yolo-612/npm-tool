import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PgKit from '@yolo/pg-kit'
import "@yolo/pg-kit/dist/index.css"
import ElementPlus from '@yolo/element-plus'


const app = createApp(App) 
app.use(PgKit)
app.use(ElementPlus)
app.mount('#app')
