# SPA Framework

## 使用方式

- 安装依赖

```bash
npm install
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

- SCSS（Sass）
- ESBuild (支持 ES2020)
- ESLint
- Prettier
- BrowserSync
- Node.js 自定义脚本

## 自定义脚本说明

- `scripts/clean.js` 清理 dist 目录。
- `scripts/build-html.js` 拷贝 HTML 文件。
