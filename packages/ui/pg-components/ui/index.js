import { PgButton, PgTag } from '@yolo/pg-components'
import Components from './components'

const Installer = {
  install(app) {
    Components.forEach((c) => {
      app.use(c)
    })
  }
}

export default Installer
export { PgButton, PgTag }