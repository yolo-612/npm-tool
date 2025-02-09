import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ButtonInstall from '@yolo/pg-components/button'
import TagInstall from '@yolo/pg-components/tag'

const app = createApp(App) 
app.use(ButtonInstall)
app.use(TagInstall)
app.mount('#app')
