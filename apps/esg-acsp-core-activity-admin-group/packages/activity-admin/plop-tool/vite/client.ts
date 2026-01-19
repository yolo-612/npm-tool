// @ts-ignore
import component from '../plop-templates/component/prompt.js';
// @ts-ignore
import page from '../plop-templates/page/prompt.js';
// @ts-ignore
import store from '../plop-templates/store/prompt.js';
import mock from '../plop-templates/mock/prompt.js';
// @ts-ignore
import { Bridge, bridgeEvents } from './Bridge.js';
import type { PlopGeneratorData, PlopActionHooksChanges, PlopActionHooksFailures } from '../types.js';

const bridge = new Bridge();

export const getPlopGeneratorData = async ():Promise<PlopGeneratorData> => {
  const {
    componentDirs,
    componentNames,
    pageDirs,
    mockDirs,
  } = await bridge.send(bridgeEvents.get_project_dirs_info) as any;

  return ({
    welcomeMessage: '请选择需要创建的模式：',
    generators: [
      { name: 'component', ...component(componentDirs, componentNames) },
      { name: 'page', ...page(pageDirs) },
      { name: 'store', ...store() },
      { name: 'mock', ...mock(mockDirs) },
    ],
  }) as PlopGeneratorData;
};

export const runPlopAction = async (data:any) => {
  return await bridge.send(bridgeEvents.run_plop_action, data) as {changes: PlopActionHooksChanges[], failures: PlopActionHooksFailures[]};
};
