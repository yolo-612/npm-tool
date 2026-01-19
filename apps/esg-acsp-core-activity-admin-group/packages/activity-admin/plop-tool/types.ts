import type { PlopGeneratorConfig } from 'plop';
import type { Actions, PromptQuestion } from 'node-plop';

export interface PlopGeneratorConfigNew extends PlopGeneratorConfig {
  name:string,
  description: string;
  prompts: (PromptQuestion & {choices:any[]})[];
  actions: Actions;
  tips?:string;// 提示，扩展字段，用来给UI显示
}

export interface PlopGeneratorData {
  welcomeMessage?:string,
  generators: PlopGeneratorConfigNew[]
}

export interface PlopActionHooksFailures {
  type: string;
  path: string;
  error: string;
  message: string;
}

export interface PlopActionHooksChanges {
  type: string;
  path: string;
}
