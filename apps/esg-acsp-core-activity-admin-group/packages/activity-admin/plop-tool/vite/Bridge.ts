import type { HMRBroadcaster } from 'vite';

export class Bridge {
  hmrBroadcaster:HMRBroadcaster|null = null;
  constructor() {
    // @ts-ignore
    this.hmrBroadcaster = import.meta.hot as HMRBroadcaster;
  }
  send(event = '', data?:any) {
    const hmrBroadcaster = this.hmrBroadcaster;
    return new Promise((resolve) => {
      function callback(data1:any) {
        resolve(data1);
        hmrBroadcaster?.off(`${event}:res`, callback);
      }

      hmrBroadcaster?.on(`${event}:res`, callback);

      hmrBroadcaster?.send(`${event}:req`, data);
    });
  }
}

export class ServerBridge {
  hmrBroadcaster:HMRBroadcaster|null = null;
  constructor(hmrBroadcaster:HMRBroadcaster) {
    this.hmrBroadcaster = hmrBroadcaster;
  }
  on(event = '', handler:(data?:any)=>Promise<any>) {
    const hmrBroadcaster = this.hmrBroadcaster;

    hmrBroadcaster?.on(`${event}:req`, (data:any) => {
      if (handler) {
        handler(data).then((data) => {
          hmrBroadcaster?.send(`${event}:res`, data);
        });
      }
    });
  }
}

export const bridgeEvents = {
  get_project_dirs_info: 'get_project_dirs_info', // 获取项目目录信息
  run_plop_action: 'run_plop_action', // 运行plop action创建文件
};
