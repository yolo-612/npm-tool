import { VPTheme } from '@vue/theme';
import { h } from 'vue';
import '@yolo/theme/src/css/brand/_blue.css';
import '@yolo/theme/src/css/brand/_red.css';
import './override.css';

import SDesignElementPlus from '@yolo/element-plus';
import './element-plus-variables.scss';

import { globals } from '../vitepress';
import { registerComponents } from './register-components';

import 'vitepress-theme-demoblock/dist/theme/styles/index.css';
import 'prismjs/themes/prism.css';

export default {
  ...VPTheme,
  Layout() {
    return h(VPTheme.Layout, null, {
      // uncomment to test layout slots
      // 'sidebar-top': () => h('div', 'hello top'),
      // 'sidebar-bottom': () => h('div', 'hello bottom'),
      // 'content-top': () => h('h1', 'Announcement!'),
      // 'content-bottom': () => h('div', 'Some ads'),
      // 'aside-top': () => h('div', 'this could be huge'),
      // 'aside-mid': () => h('div', { style: { height: '300px' }}, 'Sponsors'),
      // 'aside-bottom': () => h('div', { style: { height: '300px' }}, 'Sponsors'),
    });
  },

  enhanceApp: ({ app }: any) => {
    registerComponents(app);
    globals.forEach(([name, Comp]) => {
      app.use(SDesignElementPlus);
      app.component(name, Comp);
    });
  }
};
