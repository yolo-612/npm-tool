import type { App } from 'vue';
import * as components from './src/index';
import directives from './directives';
import './assets/style/index.scss';

export * from './src/index';
export * from './utils/index';

export default {
  install: (app: App) => {
    /* 注册组件 */
    Object.values(components).forEach((comp: any) => {
      comp.install && app.use(comp);
    });
    /* 注册指令 */
    app.use(directives);
  },
};
