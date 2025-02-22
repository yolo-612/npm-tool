---
title: 快速开始
---

# 快速开始

本节将介绍如何在项目中使用 SFDesign。

## 用法（完整引入）

#### 主题
```typescript
// 蓝色主题(默认)
import '@sdesign/theme/src/css/brand/_blue.css'
// 红色主题
import '@sdesign/theme/src/css/brand/_red.css'
// 规范(默认)
import '@sdesign/theme/index.css'
```

#### 基于Element-Plus的实现
* 创建一个scss文件_element-plus-variables.scss
```scss
$namespace: 'sf'; // 命名空间（修改的话才加上）
@import "@yolo/element-plus/style/index.scss";
```
* 入口文件引入
```typescript
import SDesignElementPlus from '@yolo/element-plus';
import './_element-plus-variables.scss';
// 使用自定义指令
import { Directives } from '@yolo/element-plus'; // 使用自定义指令
// 继承并扩展了element-plus多语言文件
import { Utils } from '@yolo/element-plus';

// 命名空间、多语言（修改的话才加上）
app.use(SDesignElementPlus, { namespace: 'sf', i18n: Utils.en });
Object.keys(Directives).forEach((key) => {
  app.directive(key, Directives[key]);
});
```

#### 基于Antdv3的实现
```typescript
import SDesignAntdv3 from '@sdesign/antdv3';
import '@sdesign/antdv3/style/index.less';

app.use(SDesignAntdv3);
```

## 用法（按需引入）
待开发。