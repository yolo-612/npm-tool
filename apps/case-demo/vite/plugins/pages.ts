import VueRouter from 'unplugin-vue-router/vite'

/**
 * 文件系统路由插件
 * */
export default function createPages() {
  return VueRouter({
    routesFolder: [
      {
        src: 'src/pages',
      },
    ],
    // what files should be considered as a pages
    extensions: ['.vue'],
    // where to generate the types
    dts: './src/types/typed-router.d.ts',
    // list of glob files to exclude from the routes generation
    // e.g. ['**/__*'] will exclude all files and folders starting with `__`
    // e.g. ['**/__*/**/*'] will exclude all files within folders starting with `__`
    // e.g. ['**/*.component.vue'] will exclude components ending with `.component.vue`
    exclude: ['**/components/*.vue'],
    // Customizes the default langage for `<route>` blocks
    // json5 is just a more permissive version of json
    routeBlockLang: 'json5',
    // Change the import mode of page components. Can be 'async', 'sync', or a function with the following signature:
    // (filepath: string) => 'async' | 'sync'
    importMode: 'async',
    // routeStyle:'nuxt',
  });
}
