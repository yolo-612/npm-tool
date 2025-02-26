# SDesign Theme
> 采用style-dictionary对Tokens进行重构（适用于SDesign所有UI组件）

## 项目结构
* 支持 css、scss、less
```
.
├── README.md
├── build
│   ├── blue.config.js
│   ├── config.js
│   └── red.config.js
├── hooks
│   ├── createPropertyFormatter.js
│   ├── format.js
│   └── transform.js
├── index.css
├── package.json
├── src
│   ├── common.css
│   ├── css
│   │   ├── _blue_variables.css
│   │   ├── _red_variables.css
│   │   └── brand
│   │       ├── _blue.css
│   │       └── _red.css
│   ├── less
│   │   ├── _blue_variables.less
│   │   ├── _red_variables.less
│   │   └── brand
│   │       ├── _blue.less
│   │       └── _red.less
│   └── scss
│       ├── _blue_variables.scss
│       ├── _red_variables.scss
│       └── brand
│           ├── _blue.scss
│           └── _red.scss
└── tokens
    ├── alpha.json
    ├── brand
    │   ├── blue.json
    │   └── red.json
    ├── color
    │   ├── base.json
    │   ├── bg.json
    │   ├── border.json
    │   ├── disable.json
    │   ├── fill.json
    │   ├── link.json
    │   └── status.json
    ├── font
    │   ├── color.json
    │   ├── size.json
    │   └── weight.json
    ├── radius
    │   └── index.json
    ├── shadow
    │   └── index.json
    └── spacing
        └── index.json
```

## 如何使用
* 标准Tokens：_blue_variable.css 或 _red_variable.css，根据自身项目选择
* 默认主题（2套）：brand/_red.css（红色）、brand/_blue.css（蓝色）

## 使用项目
@sdesign/antdv3、@sdesign/element-plus

## 贡献者（排名不分先后）
* UED组：王任悦（01403057）、王磊（01408704）、林嘉栋（01398495）
* 开发：侯德善（01414123）