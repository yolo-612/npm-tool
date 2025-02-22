---
title: 常见问题
---

# 常见问题
## 1、使用Vite构建出现Dayjs相关错误<br/>
<span style="color: red">Uncaught SyntaxError: The requested module '/node_modules/.pnpm/dayjs@1.11.9/node_modules/dayjs/dayjs.min.js?v=7ada05d9' does not provide an export named 'default'</span>

#### 解决方法：
```ts
# vite.config.ts
export default defineConfig({
  ...
  optimizeDeps: {
    include: ["element-plus"],
  },
  ...
});

```

## 2、在element-plus升级到2.5.x时，选择器组件结构变动，1.2.x无法适配的问题<br/>

#### 解决方法：
若使用peerDependencies安装的element-plus,版本范围已经划定好了，"element-plus": ">=2.3.0 <2.5.0"。
<br/>
针对element-plus最新版本，会开发1.3.x版本以作支持。

## 3、在引入@yolo/element-plus后，使用项目未加任何样式，可能组件样式会有问题<br/>

#### 解决方法：
组件库中内置了common.scss，文件里有一些预设的样式，减少接入成本，其中内容包含：
```scss
*,
::before,
::after {
    box-sizing: border-box;
}
```