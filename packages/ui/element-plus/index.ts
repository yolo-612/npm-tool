import ElementPlus  from 'element-plus';
import type { App, Plugin } from 'vue';

const install: Plugin = {
  install(app: App) {
    app.use(ElementPlus)
  }
}

export default install
