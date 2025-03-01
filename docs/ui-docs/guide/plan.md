---
title: 开发计划
---

# 开发计划 
稳定分支在master，feature/element-plus-V1.2.0，feature/antdv3-V1.1.0，feature/antdv4-V1.0.0，迭代更新比较频繁。

[Vue2版本计划](https://sdesign.sit.sf-express.com/v2/guide/plan/)

[React版本计划](https://sdesign.sit.sf-express.com/react/guide/plan)

## 目前已有功能

* 组件功能和文档已经完成，并发布了npm包（@yolo/theme、@yolo/element-plus、@sdesign/antdv3）
* 基础组件相对比较完整，并有部分业务组件
* 支持文档（代码+实现）的方式查看组件的使用方法
* 维护了主题包@yolo/theme，可被引入到其他项目中使用
* 适配UED新规范

## 未来功能规划
[SFDesign组件库进度表（新规范）.xlsx](https://doc.sf-express.com/view/l/t6ahfwh)

[WEB组件问题收集](https://fsdocs.sf-express.com/smartsheet/DQURGc0Rmdm1rZ0preFpTSFJX?tab=BB08J2)

## 如何贡献（PR）

> 使用中发现的问题或建议可在issue中提出

<img src="https://sdesign.sit.sf-express.com/v2/img/pr-flow.png" alt="pr" />

### 样式覆盖在以下目录
```
.
└── components
   ├── antdv3
   │    └── style
   │        └── components
   │            ├── reset.xxx.scss
   ├── antdv4
   │    └── style
   │        └── components
   │            ├── reset.xxx.scss
   └── element-plus
        └── style
            └── components
                ├── reset.xxx.scss
```

> 业务组件在以下目录
```
.
└── components
   ├── antdv3
   │    └── packages
   │        └── xxx // 组件名
   │            ├── index.ts
   │            ├── index.scss // 对应样式
   │            └── src
   │                └── xxx.vue // 对应组件
   ├── antdv4
   │    └── packages
   │        └── xxx // 组件名
   │            ├── index.ts
   │            ├── index.scss // 对应样式
   │            └── src
   │                └── xxx.vue // 对应组件
   └── element-plus
        └── packages
            └── xxx // 组件名
                ├── index.ts
                ├── index.scss // 对应样式
                └── src
                    └── xxx.vue // 对应组件
```

先在内源Fork项目，在目前主要的开发分支中拉取到本地进行开发，对于功能新增和优化的commit信息需填写完整，同时补充对应文档信息（比如组件新增的特性，相应的API和示例），提交PR后，我们会及时处理合并。

* 相对固定的npm发布时间点：**每周四的18点**

## 相关文章
[B端组件库的设计与实现](http://techone.sf-express.com/postDetail?id=101762)