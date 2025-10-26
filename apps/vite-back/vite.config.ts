import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import dayjs from 'dayjs';
import pkg from './package.json';

import createVitePlugins from './vite/plugins';


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
export default ({mode, command}: any)=>{
  const env = loadEnv(mode, process.cwd());
  console.log('env', env);
  console.log('command', command);
  console.log('mode', mode);
  return defineConfig({
    base: env.VITE_PUBLIC_PATH,
    build:{
      assetsDir:'static',
      sourcemap: true,
    },
    server:{
      proxy: getProxy(),
    },
    plugins: createVitePlugins(env, command === 'build', mode),
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