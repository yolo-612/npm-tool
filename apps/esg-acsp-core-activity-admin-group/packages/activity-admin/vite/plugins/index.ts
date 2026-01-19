import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import process from 'node:process';
import createMock from './mock';
import createPages from './pages';
import createLayouts from './layouts';
import createComponents from './components';
import createAutoImport from './auto-import';
import createBuildVisualizer from './build-visualizer';
import createDevTools from './dev-tools';
import createNewCodeTool from './new-code-tool';
import createFederation from './federation';

export default function createVitePlugins(viteEnv:object, isBuild = false, mode:string) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    createPages(),
    // ⚠️ Vue must be placed after createPages()
    vue(),
    vueJsx(),
    createLayouts(),
    createComponents(),
    createAutoImport(),
    createMock(viteEnv, isBuild),
    createNewCodeTool(),
    createDevTools(),
    createFederation(viteEnv),
  ];
  if (process.env.USE_VISUALIZER) {
    vitePlugins.push(createBuildVisualizer());
  }
  return vitePlugins;
}
