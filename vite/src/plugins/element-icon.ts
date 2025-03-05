import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default function ({router,app,pinia}) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
