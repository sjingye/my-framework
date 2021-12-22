  module.exports = {
    // 接口代理1
    '/api/': {
      target: 'http://198.168.111.111:3001',
      changeOrigin: true,
    },
    // 接口代理2
    '/api-2/': {
      target: 'http://198.168.111.111:3002',
      changeOrigin: true,
      pathRewrite: {
        '^/api-2': '',
      },
    },
    // .....
  }