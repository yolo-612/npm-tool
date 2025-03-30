import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import createPages from './pages';
import createLayouts from './layouts';
import createComponents from './components';
import createAutoImport from './auto-import';

export default function createVitePlugins(viteEnv:object, isBuild = false, mode:string) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    createPages(),
    createLayouts(),
    // ⚠️ Vue must be placed after createPages()
    vue(),
    vueJsx(),
    createComponents(),
    createAutoImport(),
  ];
  return vitePlugins;
}
