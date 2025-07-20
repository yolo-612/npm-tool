import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // 构建库就需要这个配置
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'ele-config-comp',
      fileName: (format) => `ele-config-comp.${format}.js`
    },
    rollupOptions: {
      // 这里的外部依赖配置告诉 Vite 不打包 Vue 库
      external: ['vue'], 
      output: {
        // 让 Vue 作为外部依赖，不打包进最终产物
        globals: {
          vue: 'Vue',
        }
      }
    }
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), './assets/icons')],
      symbolId: 'configComp-icon-[name]',
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ]
})