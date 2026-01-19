import type {
  PluginOption, ResolvedConfig, ViteDevServer, HmrContext,
} from 'vite';
import ServerContext from './ServerContext';

export default function VitePluginNewCodeTool(options:any): PluginOption {
  let config: ResolvedConfig;
  const serverContext = new ServerContext();

  function configureServer(server: ViteDevServer) {
    serverContext.init(server);
  }

  return <PluginOption>{
    name: 'vite-plugin-new-code-tool',
    enforce: 'pre',
    apply: 'serve', // 只在开发模式使用
    resolveId: (id, importer) => {
      // console.log("resolveId",id)
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    handleHotUpdate(context:HmrContext) {
      if (serverContext.handleHotUpdate(context)) {
        return [];
      }
    },
    configureServer(server) {
      configureServer(server);
    },
  };
}
