import { vitePluginFakeServer } from "vite-plugin-fake-server";

export default function createFakeMock(env:any, isBuild:boolean) {
  const { VITE_USE_MOCK } = env;
  return vitePluginFakeServer({
    logger: true,
    include:'mock',
    infixName:false,
    enableDev: VITE_USE_MOCK === 'true',
  });
}
