import { createApp } from 'vue';
import type { App } from 'vue';
import NewCodeTool from './NewCodeTool.vue';
import initSfDesign from '@/plugins/sf-design';

let div:HTMLElement|null = null;
let app:App|null = null;

export const showNewCodeTool = () => {
  if (!app) {
    app = createApp(NewCodeTool);
    div = document.createElement('div');
    document.body.append(div);

    initSfDesign({ app });
    app.mount(div);
  }
};

export const hideNewCodeTool = () => {
  if (app) {
    app.unmount();
    app = null;
    div!.remove();
    div = null;
  }
};
