module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
    REACT_APP_BASE_API: '"https://www.baidu.com"',
  },
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
     webpackChain(chain) {
      chain.merge({
        plugin: {
          install: {
            // eslint-disable-next-line global-require
            plugin: require('compression-webpack-plugin'),
            args: [
              {
                filename: '[path][base].gz', // 目标资源名称
                algorithm: 'gzip',
                test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 处理所有匹配此 {RegExp} 的资源
                threshold: 10240, // 只处理比这个值大的资源。按字节计算
                minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
              },
            ],
          },
        },
      });
    },
  }
}
