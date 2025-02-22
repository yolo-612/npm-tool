import Demo from '../src/vitepress/demo/Demo.vue';
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue';
import PagePipe from './PagePipe.vue';
export function registerComponents(app: any) {
  app.component('Demo', Demo);
  app.component('DemoBlock', DemoBlock);
  app.component('PagePipe', PagePipe);
}
