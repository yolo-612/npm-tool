import { defineConfig } from 'vite'

import path from 'path';

export default defineConfig({
  build: {
    // 构建库就需要这个配置
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'ele-config-comp',
      fileName: (format) => `ele-config-comp.${format}.js`
    }
  }
})