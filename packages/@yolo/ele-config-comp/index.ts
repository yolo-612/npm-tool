import type { App } from 'vue';
import * as components from './src/index';

export * from './src/index';
export * from './src/utils/index';

export default {
  install: (app: App) => {
    /* 注册组件 */
    Object.values(components).forEach((comp: any) => {
      comp.install && app.use(comp);
    });
  },
};