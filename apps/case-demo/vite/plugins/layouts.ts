import Layouts from 'vite-plugin-vue-layouts';

/**
 * 默认布局插件
 */
export default function createLayouts() {
  return Layouts({
    defaultLayout: 'default',
  });
}
