import { fileURLToPath, URL } from 'node:url';
import type { UserConfig } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import dayjs from 'dayjs';
import pkg from './package.json';
import createVitePlugins from './vite/plugins';

// https://vitejs.dev/config/
export default ({ mode, command }: any): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  console.log('env', env);
  console.log('command', command);
  console.log('mode', mode);
  return defineConfig({
    base: '/admin/actmanage/',
    build: {
      assetsDir: 'static',
      sourcemap: true,
      target: 'esnext',
      rollupOptions: {
        output: {
          // 打包输出的配置
          // manualChunks: (id) => getChunks(id),
        },
      },
    },
    define: {
      __APP_INFO__: JSON.stringify(getAppInfo()),
    },
    server: {
      // host: 'localhost.acsp-activity.sit.sf-express.com',
      hmr: { protocol: 'wss', host: 'acsp-activity.sit.sf-express.com' },
      host: '127.0.0.1',
      port: 8054,
      proxy: getProxy(),
    },
    plugins: createVitePlugins(env, command === 'build', mode),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      include: ['element-plus'],
    },
  });
};

function getProxy() {
  const getProxyObj = (proxyUrl: string) => {
    return {
      target: proxyUrl, // 被代理后实际的请求目标地址
      changeOrigin: true, // 加了这个属性，那后端收到的请求头中的host是目标地址 apiTarget
      secure: true, // 若代理的地址是https协议，需要配置这个属性
      pathRewrite: {},
      onProxyRes: function onProxyRes(proxyRes: any, req: any) {
        proxyRes.headers['X-Real-Url'] = proxyUrl + req.url; // 响应头中添加真实请求地址
      },
    };
  };
  const DEFAULT_PROXY_URL = { ...getProxyObj('https://acsp-activity.sit.sf-express.com') };
  console.log('proxyUrl', DEFAULT_PROXY_URL);
  return {
    '/activity-web-backend': DEFAULT_PROXY_URL,
    '/dev-basp-user': DEFAULT_PROXY_URL,
    '/acsp-bff': DEFAULT_PROXY_URL,
  };
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

function getChunks(id: string) {
  // 这个ID，就是所有文件的绝对路径
  if (/\/node_modules\/vue|vue-route|pinia|axios/.test(id)) {
    return 'chunk-vue';
  } else if (id.includes('components-web')) {
    return 'chunk-components-web';
  } else if (id.includes('element-plus')) {
    return 'chunk-element-plus';
  } else if (/\/node_modules\/@sdesign\/icons-vue/.test(id)) {
    return 'chunk-sdesign-icons';
  } else if (/\/node_modules\/mockjs/.test(id)) {
    return 'chunk-mockjs';
  } else if (id.includes('node_modules')) {
    // 因为 node_modules 中的依赖通常是不会改变的
    // 所以直接单独打包出去
    // 这个return 的值就是打包的名称
    return 'vendor';
  }
}
