import { viteMockServe } from 'vite-plugin-mock';

export default function createMock(env:any, isBuild:boolean) {
  const { VITE_BUILD_MOCK } = env;
  return viteMockServe({
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import { setupProdMockServer } from '../vite/mockProdServer';
      setupProdMockServer();
      `,
  });
}
