import * as path from 'path';
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: '@yolo/element-plus',
      fileName: (format) => `element.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖，防止多个vue产生冲突
      external: ['vue']
    },
    cssCodeSplit: true
  }
})
