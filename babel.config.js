// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    [
      'taro',
      {
        // 框架：`nerv`, `react`, `vue` 三选一
        framework: 'react',
        // 是否使用 TypeScript，当值为 true 时，使用 `@babel/preset-typescript` 编译
        ts: true,
        // 以下参数为 @babel/preset-env 的参数：
        // https://babeljs.io/docs/en/babel-preset-env
        loose: false,
        useBuiltIns: false,
        targets: {
          ios: '8',
          android: '5',
        },
      },
    ],
  ],
  plugins: [
    [
      'import',
      {
        libraryName: '@antmjs/vantui',
        libraryDirectory: 'es',
        style: (name) => `${name}/style/less`,
      },
      '@antmjs/vantui',
    ],
  ],
};
