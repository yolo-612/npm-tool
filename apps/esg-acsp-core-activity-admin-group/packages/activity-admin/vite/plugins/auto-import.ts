import AutoImport from 'unplugin-auto-import/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createAutoImport() {
  return AutoImport({
    imports: [
      'vue',
      'pinia',
      VueRouterAutoImports,
    ],
    dts: './src/types/auto-imports.d.ts',
    dirs: [
    ],
    eslintrc: {
      enabled: true,
    },
    // resolvers: [ElementPlusResolver()],
  });
}
