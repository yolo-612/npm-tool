import type { HMRBroadcaster, ViteDevServer, HmrContext } from 'vite';
import nodePlop from 'node-plop';
import path from 'path';
import process from 'node:process';
import chalk from 'chalk';
import { getFolder, getFilesName } from './server';
import { ServerBridge, bridgeEvents } from './Bridge';

export default class ServerContext {
  server: ViteDevServer|null = null;
  bridge: ServerBridge|null = null;
  filesCache = new Set();

  init(viteDevServer:ViteDevServer) {
    if (this.server) {
      // 会多次调用，防止重复初始化
      return;
    }
    this.server = viteDevServer;
    this.bridge = new ServerBridge(viteDevServer.hot);

    this.registerBridgeEvent();
  }

  /**
   * 拦截热更新，阻止页面重新加载
   * @param context
   * @return 如果拦截就返回true，否则返回false
   */
  handleHotUpdate(context:HmrContext):boolean {
    const { file } = context;
    if (this.filesCache.has(file)) {
      // 通过plop脚本更新的文件无需热更新，判断完后删除重置
      this.filesCache.delete(file);
      return true;
    }
    return false;
  }

  registerBridgeEvent() {
    if (!this.bridge) return;

    // 将项目文件夹信息传给客户端
    this.bridge.on(bridgeEvents.get_project_dirs_info, async () => {
      const componentDirs = getFolder('src/components');
      const componentNames = getFilesName('src/components');
      const pageDirs = getFolder('src/views', 'components');
      const mockDirs = getFolder('mock');

      return {
        componentDirs,
        componentNames,
        pageDirs,
        mockDirs,
      };
    });

    // 运行plop action创建文件
    this.bridge.on(bridgeEvents.run_plop_action, ({ name, data }:any) => {
      return new Promise(async (resolve, reject) => {
        const plopfile = path.join(process.cwd(), './plopfile.js');

        // load an instance of plop from a plopfile
        // eslint-disable-next-line no-async-promise-executor
        const plop = await nodePlop(plopfile);
        // get a generator by name
        const generator = plop.getGenerator(name);

        // run all the generator actions using the data specified
        generator.runActions(data).then((results) => {
          // do something after the actions have run
          const { changes, failures } = results;
          this.filesCache.clear();
          if (changes && changes.length > 0) {
            changes.forEach((change:any) => {
              this.filesCache.add(process.cwd() + change.path);
              console.log(`${chalk.dim(new Date().toLocaleTimeString())} ${chalk.cyan.bold('[自动生成代码]')} ✨ ${chalk.bold(change.type)} ${change.path}`);
            });
          }
          if (failures && failures.length > 0) {
            failures.forEach((failure:any) => {
              console.log(`${chalk.dim(new Date().toLocaleTimeString())} ${chalk.red.bold('[自动生成代码]')} ❗ ${chalk.bold(failure.type)} ${failure.error}`);
            });
          }
          resolve(results);
        });
      });
    });
  }
}
