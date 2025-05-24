import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

import path from 'path';


export default defineConfig({
  resolve: {
    alias: {
      '@': __dirname,
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'config-comp',
      fileName: (format) => `config-comp.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖，防止多个vue产生冲突
      external: ['vue', 'element-plus'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
        },
      },
    },
    cssCodeSplit: true
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), './assets/icons')],
      symbolId: 'configComp-icon-[name]',
    }),
  ]
})