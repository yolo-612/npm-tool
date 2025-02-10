import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PgKit from '@yolo/pg-kit'


const app = createApp(App) 
app.use(PgKit)
app.mount('#app')
