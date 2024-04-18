
/**
 * 加载插件，插件统一写在/plugins目录下面
 * @param pluginsFolderGlob 插件目录通配符，例如：./plugins/*.js
 * @param router
 * @param app
 * @param pinia
 */
export default function loadPluginsJs(pluginsFolderGlob, { router, app, pinia }){
  const modules = import.meta.glob(pluginsFolderGlob,{ eager: true })
  for (const path in modules) {
    modules[path] && modules[path].default && modules[path].default({router,app,pinia});
  }
}
