const path = require('path');

const config = {
  projectName: 'miniprogram-taro-template',
  date: '2021-5-19',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  alias: {
    '@/': path.resolve(__dirname, '..', 'src/'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/services': path.resolve(__dirname, '..', 'src/services'),
  },
  framework: 'react',
  compiler: 'webpack5',
  cache: {
    enable: true // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    router: {
      mode: 'history',
    },
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    return merge({}, config, require('./dev'));
  }
  // eslint-disable-next-line global-require
  return merge({}, config, require('./prod'));
};
