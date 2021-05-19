## miniprogram-taro-template
基于Taro+React的项目基础模版库，包含eslint，stylelint等基础配置，快速搭建开箱即用


### 目录结构
```
├── LICENSE
├── README.md
├── babel.config.js  //babel配置
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
│   ├── assets  // 静态资源
│   │   └── icon.png
│   ├── components // 公共组件
│   ├── index.html
│   ├── pages
│   │   └── index
│   │       ├── index.config.ts // 页面配置
│   │       ├── index.less  // 页面样式
│   │       ├── index.tsx // 页面程序
│   │       └── service.ts  // 页面请求
│   ├── services  // 全局请求
│   ├── typings.d.ts // ts定义文件
│   └── utils（工具文件）
│       ├── index.ts  // 包含图片下载等工具函数
│       └── request.ts  // 统一封装API请求
└── tsconfig.json // TS config

```

## Getting started

```bash
# clone the project
git clone https://github.com/Teachers-Tony/miniprogram-taro-template.git

# enter the project directory
cd miniprogram-taro-template

# install dependency
yarn install

# develop
yarn dev:weapp/h5/alipay/...
```

## Build

```bash

# build for production environment
yarn build:prod
```

## License

[MIT](https://github.com/Teachers-Tony/miniprogram-taro-template/blob/main/LICENSE)

Copyright (c) 2021-present BaiHuaYang
