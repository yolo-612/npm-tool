import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 这种按需导入的方式不方便直接导入全局覆盖ui框架的样式【可通过在app.vue使用style no scoped的方式导入覆盖】
// 不能直接通过在main.js中直接导入css文件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
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
    server:{
      proxy: getProxy(),
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
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
      }),
      Components({
        dirs: [
          'src/components',
          'src/layouts',
        ],
        include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
        dts: './src/types/components.d.ts',
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

function getProxy() {
  const proxyServers = [
    "manage-srv",
  ];
  const proxy = {};
  proxyServers.forEach(function (api) {
    proxy[`/${api}`] = {
      target: 'https://xxx.sit.com',
      changeOrigin: true,
      pathRewrite: {},
      secure: false,
    };
  });
  return proxy;
}