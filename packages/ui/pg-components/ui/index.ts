import { PgButton } from '@yolo/pg-components/button'
import { PgTag } from '@yolo/pg-components/tag'
import Components from './components'
import type { App } from 'vue'
import 'virtual:uno.css'
import './styles/index.scss'

const Installer = {
  install(app: App) {
    Components.forEach((c) => {
      app.use(c)
    })
  }
}

export default Installer
export { PgButton, PgTag }