import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import dayjs from 'dayjs';
import pkg from './package.json';
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 这种按需导入的方式不方便直接导入全局覆盖ui框架的样式【可通过在app.vue使用style no scoped的方式导入覆盖】
// 不能直接通过在main.js中直接导入css文件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts';

/**
 * 文件系统路由插件
 * */
function createPages() {
  return VueRouter({
    routesFolder: [
      {
        src: 'src/pages',
      },
    ],
    // what files should be considered as a pages
    extensions: ['.vue'],
    // where to generate the types
    dts: './src/types/typed-router.d.ts',
    // list of glob files to exclude from the routes generation
    // e.g. ['**/__*'] will exclude all files and folders starting with `__`
    // e.g. ['**/__*/**/*'] will exclude all files within folders starting with `__`
    // e.g. ['**/*.component.vue'] will exclude components ending with `.component.vue`
    exclude: ['**/components/*.vue'],
    // Customizes the default langage for `<route>` blocks
    // json5 is just a more permissive version of json
    routeBlockLang: 'json5',
    // Change the import mode of page components. Can be 'async', 'sync', or a function with the following signature:
    // (filepath: string) => 'async' | 'sync'
    importMode: 'async',
    // routeStyle:'nuxt',
  });
}

/**
 * 默认布局插件
 */
function createLayouts() {
  return Layouts({
    defaultLayout: 'default',
  });
}


function getAppInfo() {
  const {
    dependencies, devDependencies, name, version,
  } = pkg;
  return {
    pkg: {
      dependencies,
      devDependencies,
      name,
      version,
    },
    buildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  };
}

// https://vitejs.dev/config/
export default ({mode}: any)=>{
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
      createPages(),
      createLayouts(),
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
    define: {
      __APP_INFO__: JSON.stringify(getAppInfo()),
    },
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