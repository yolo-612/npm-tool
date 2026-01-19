import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

// 逐一导入您的mock.ts文件
// 如果使用vite.mock.config.ts，只需直接导入文件
// 可以使用import.meta.glob功能来进行全部导入

let mockModules:any[] = [];
const modules: any = import.meta.glob('../mock/**/*.mock.ts', { eager: true });
Object.keys(modules).forEach((path) => {
  mockModules = mockModules.concat([...modules[path].default]);
});

export function setupProdMockServer() {
  createProdMockServer([...mockModules]);
}
