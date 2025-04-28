# SPA Framework

## 使用方式

- 安装依赖

```bash
npm install
```

- 构建css文件

```bash
npm run build:css
```

- 构建js文件

```bash
npm run build:js
```

- 构建html文件

```bash
npm run build:html
```

- 开发模式

```bash
npm run dev
```

- 构建项目

```bash
npm run build
```

- 启动构建后的项目

```bash
npm run start
```

- 格式化和检查代码

```bash
npm run lint
```

- 清空构建目录

注：考虑window平台不能使用rm -rf命令，则书写脚本借助fs库完成操作
```bash
npm run clean
```

## 技术栈

- **Sass**：用于写样式，支持 SCSS 语法。
- **ESBuild**：用于构建 JavaScript，支持 ES2020 语法。
- **ESLint**：用于检查 JavaScript 代码的质量和规范，确保代码一致性。
- **Prettier**：用于格式化代码，确保代码风格一致。
- **Browser-Sync**：用于启动本地开发服务器，并提供热更新和自动刷新功能。
- **Chokidar**：用于监控文件变化并触发构建命令，支持增量构建

## 自定义脚本说明

- `scripts/clean.js` 清理 dist 目录。
- `scripts/build-html.js` 拷贝 HTML 文件。
