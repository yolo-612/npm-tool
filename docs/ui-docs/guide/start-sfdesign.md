---
title: 一键生成 sfdesign 项目
---

# 一键生成 sfdesign 项目

基于 `sfcli + sfdesign` 搭建，详见官方文档：

[sfcli 官方文档](https://sf-cli.sit.sf-express.com/)

[sfdesign 官方文档](https://sdesign.sit.sf-express.com/)

## 初始化项目
可以选择使用 npm 或者 yarn 工具进行项目初始化，如下输入项目名即可：
```js
  $ npm init sfjs <projectName> --template @sfclidesign/scaffold-vue3-vite-admin
  # or
  $ yarn create sfjs <projectName> --template @sfclidesign/scaffold-vue3-vite-admin
```

执行上述命令后，会自动创建项目，看到如下信息说明项目创建成功：

```
✔ download npm tarball successfully.
clean package.json...

Initialize project successfully.

Starts the development server.

    cd <projectName>
    npm install
    npm start
```

## 启动项目
按照上面的提示，进入新建的项目安装依赖即可：

```js
  $ cd <projectName>
  # 安装依赖
  $ pnpm i
  # 启动项目
  $ pnpm serve
```

执行上述命令后，会自动打开浏览器窗口访问 `http://localhost:xxxx`，这时应该看到默认的页面。

看到如下信息说明项目启动成功：
```
> sfjs serve

@sfcli/sfjs 0.8.12
Browserslist: caniuse-lite is outdated. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
frameWork:  vue
  ➜  Local:   http://localhost:3333/
  ➜  Network: http://100.119.145.136:3333/
  ➜  Network: http://192.168.255.10:3333/
```