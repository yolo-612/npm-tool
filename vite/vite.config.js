import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 这种按需导入的方式不方便直接导入全局覆盖ui框架的样式【可通过在app.vue使用style no scoped的方式导入覆盖】
// 不能直接通过在main.js中直接导入css文件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default ({mode})=>{
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    base: env.VITE_PUBLIC_PATH,
    build:{
      assetsDir:'static',
      sourcemap: true,
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    optimizeDeps: {
      include: ["element-plus"],
    },
  })
}