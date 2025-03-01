---
title: 安装
---

# 安装

## 环境支持

SFDesign 可以在支持 [ES2018](https://caniuse.com/?feats=mdn-javascript_builtins_regexp_dotall,mdn-javascript_builtins_regexp_lookbehind_assertion,mdn-javascript_builtins_regexp_named_capture_groups,mdn-javascript_builtins_regexp_property_escapes,mdn-javascript_builtins_symbol_asynciterator,mdn-javascript_functions_method_definitions_async_generator_methods,mdn-javascript_grammar_template_literals_template_literal_revision,mdn-javascript_operators_destructuring_rest_in_objects,mdn-javascript_operators_spread_spread_in_destructuring,promise-finally) 和 [ResizeObserver](https://caniuse.com/resizeobserver)的浏览器上运行。
如果您确实需要支持旧版本的浏览器，请自行添加 [Babel](https://babeljs.io/) 和 Polyfill。

由于 Vue 3 不再支持 IE11，SFDesign 也不再支持 IE 浏览器。

| ![IE](https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge_32x32.png) | ![Firefox](https://cdn.jsdelivr.net/npm/@browser-logos/firefox/firefox_32x32.png) | ![Chrome](https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome_32x32.png) | ![Safari](https://cdn.jsdelivr.net/npm/@browser-logos/safari/safari_32x32.png) |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Edge ≥ 79                                                              | Firefox ≥ 78                                                                      | Chrome ≥ 64                                                                    | Safari ≥ 12                                                                    |

### 版本

SFDesign 目前还处于快速开发迭代中。

> @yolo/theme:^1.2.0、@yolo/element-plus:^1.2.30、@yolo/element-plus:^1.3.7、@yolo/element-plus:^1.4.4、@sdesign/andtv3:^1.1.10<br>
> https://artifactory.sf-express.com/ui/packages?name=@sdesign&type=packages

## 使用包管理器

**我们建议您使用包管理器 ([PnPM](https://pnpm.io/), npm, [Yarn](https://classic.yarnpkg.com/lang/en/)) 安装 SFDesign**,
然后您就可以使用打包工具，例如 [Vite](https://vitejs.dev) 和
[webpack](https://webpack.js.org/).

```shell
# 选择一个你喜欢的包管理器

# 主题安装
# PnPM
$ pnpm install @yolo/theme --save

# NPM
$ npm install @yolo/theme --save

# Yarn
$ yarn add @yolo/theme
```

```shell
# 基于element-plus的实现
# PnPM
$ pnpm install @yolo/element-plus --save
```

```shell
# 基于antdv3的实现
# PnPM
$ pnpm install @sdesign/antdv3 --save
```

## 相关依赖
@yolo/element-plus
```json
"peerDependencies": {
    "@sdesign/icons-vue": ">=1.0.0",
    "element-plus": ">=2.5.0 <2.7.0",
    "vue": ">=3.2.0",
    "sass": ">=1.59.3",
    "sass-loader": ">=13.2.0"
}
```

## 浏览器直接引入
待发布。