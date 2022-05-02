## miniprogram-taro-template

基于 Taro+React 的项目基础模版库，包含 eslint，stylelint 等基础配置，快速搭建开箱即用

### UI 组件库

使用@antmjs/vantui，由 taro 团队基于有赞 VantWeapp 开发的同时支持 Taro 和 React 的 UI 库。[官方文档链接](https://antm-js.gitee.io/vantui/#/home)

### 目录结构

```
├── LICENSE
├── README.md
├── babel.config.js  （babel配置）
├── config
│   ├── dev.js
│   ├── index.js
│   └── prod.js
├── package.json
├── project.config.json
├── project.tt.json
├── src
│   ├── app.config.ts
│   ├── app.less
│   ├── app.ts
│   ├── assets  （静态资源）
│   │   └── icon.png
│   ├── components （公共组件）
│   ├── index.html
│   ├── pages
│   │   └── index
│   │       ├── index.config.ts （页面配置）
│   │       ├── index.less  （页面样式）
│   │       ├── index.tsx （页面程序）
│   │       └── service.ts  （页面请求）
│   ├── services  （全局请求）
│   ├── typings.d.ts （ts定义文件）
│   └── utils（工具文件）
│       ├── index.ts  （包含图片下载等工具函数）
│       └── request.ts  （统一封装API请求）
└── tsconfig.json （TS config）

```

### Getting started

```bash
# clone the project
git clone https://github.com/uzhan/miniprogram-taro-template.git

# enter the project directory
cd miniprogram-taro-template

# install dependency
yarn install

# develop
yarn dev:weapp/h5/alipay/...
```

### Build

```bash

# build for production environment
yarn build:prod
```

### 其他注意事项

需要注意开发者工具的项目设置：

- 需要设置关闭 ES6 转 ES5 功能，开启可能报错
- 需要设置关闭上传代码时样式自动补全，开启可能报错
- 需要设置关闭代码压缩上传，开启可能报错

### License

[MIT](https://github.com/uzhan/miniprogram-taro-template/blob/main/LICENSE)

Copyright (c) 2021-present BaiHuaYang
