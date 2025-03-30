// 这种按需导入的方式不方便直接导入全局覆盖ui框架的样式【可通过在app.vue使用style no scoped的方式导入覆盖】
// 不能直接通过在main.js中直接导入css文件
import AutoImport from 'unplugin-auto-import/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createAutoImport() {
  return AutoImport({
    imports: [
      'vue',
      'pinia',
      VueRouterAutoImports,
    ],
    dts: './src/types/auto-imports.d.ts',
    dirs: [],
    eslintrc: {
      enabled: true,
    },
    resolvers: [ElementPlusResolver()],
  });
}
