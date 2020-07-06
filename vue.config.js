'use strict'

module.exports = {
  css: {
    sourceMap: process.env.NODE_ENV === 'development'
  },
  devServer: {
    hot: true,
    overlay: {
      warnnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
