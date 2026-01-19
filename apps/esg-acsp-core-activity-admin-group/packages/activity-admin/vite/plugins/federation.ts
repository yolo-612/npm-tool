/** 使用模块联邦 调用外部项目模块 */
import Federation from '@originjs/vite-plugin-federation';

export default function createFederation(viteEnv:any) {
  return Federation({
    // 模块名称
    name: 'acsp-activity-admin',
    // 作为本地模块，引用的远端模块入口文件
    remotes: {
      'ces-gift-web': '/ces-web-frontend/static/remoteEntry.js',
    },
    // 本地模块和远程模块共享的依赖 按需调整。
    shared: ['vue', 'axios'],
  });
}
