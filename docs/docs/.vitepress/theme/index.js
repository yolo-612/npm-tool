import DefaultTheme from 'vitepress/theme'
import PgKitInstall from '@yolo/pg-kit'
import "@yolo/pg-kit/dist/index.css"

import './styles/index.css'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(PgKitInstall)
    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)
  }
}
