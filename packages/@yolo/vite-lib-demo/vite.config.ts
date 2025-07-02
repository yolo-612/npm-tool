import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path';

export default defineConfig({
  build: {
    // 构建库就需要这个配置
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'vite-lib-demo',
      fileName: (format) => `vite-lib-demo.${format}.js`
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
  plugins: [vue()]
})