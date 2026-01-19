import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dts from 'vite-plugin-dts';
import DefineOptions from 'unplugin-vue-define-options/vite';
// 自动导入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export default defineConfig({
  resolve: {
    alias: {
      '@': __dirname,
    },
  },
  css: {
    /* 指定传递给 CSS 预处理器的选项 */
    preprocessorOptions: {
      /* 全局引入定义的scss变量 并 取消别名 */
      scss: {
        additionalData: '@use "./assets/style/element/index.scss" as *;',
      },
    },
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    /* false 可以禁用最小化混淆 */
    minify: false,
    /* 库模式 不能用html为入口 指定了lib css默认不拆分 */
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      // formats: ['es', 'cjs'],
      // fileName: 'test-filename',
    },
    rollupOptions: {
      /* 外部化处理文件 */
      external: ['vue'],
      input: ['index.ts'],
      output: [
        {
          format: 'es',
          /* 不指定package.json中的type字段 Node默认将mjs处理成ES模块 */
          entryFileNames: '[name].mjs',
          /* 打包目录和项目目录对应 */
          preserveModules: true,
          /* 对应的项目根目录 */
          preserveModulesRoot: __dirname,
          /* 命名模式导出 */
          exports: 'named',
          /* 输出目录 */
          dir: 'dist/es',
        },
        {
          format: 'cjs',
          /* 同上 Node默认将js处理成CJS模块 */
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: __dirname,
          dir: 'dist/lib',
          exports: 'named',
        },
      ],
    },
  },
  plugins: [
    vue(),
    /* 向打包后的库里加入声明文件 */
    dts({
      entryRoot: __dirname,
      outDir: [
        'dist/es',
        'dist/lib',
      ],
      tsconfigPath: './tsconfig.json',
      // exclude: ['@/utils']
      // include: 'src/**/*.{ts,tsx,vue}'
    }),
    /* 组件自定义命名 */
    DefineOptions(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), './assets/icons')],
      symbolId: 'componentsWeb-icon-[dir]-[name]',
    }),
    /* 自动导入API */
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        'vue',
      ],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [ElementPlusResolver({})],
    }),
    /* 自动导入src目录下的组件和element-plus组件 */
    Components({
      dirs: ['./src'],
      extensions: ['vue'],
      globs: ['src/*/*.vue'],
      // 配置文件生成位置
      dts: 'src/components.d.ts',
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    // 将代码中的scss替换成css  import "./style/index.scss"  --> import "./style/index.css"
    // {
    //   name: 'style',
    //   generateBundle(config, bundle) {
    //     // 这里可以获取打包后的文件目录以及代码code
    //     const fileNames = Object.keys(bundle)
    //     for (const fileName of fileNames) {
    //       const bundler = bundle[fileName]
    //       // rollup内置方法，将所有输出文件code中的 .scss 换成 css
    //       this.emitFile({
    //         type: 'asset',
    //         fileName,
    //         //@ts-ignore
    //         source: bundler.code.replace(/\.scss/g, '.css')
    //       })
    //     }
    //   }
    // }
  ],
});
