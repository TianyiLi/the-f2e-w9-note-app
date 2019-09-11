module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'https://tianyili.github.io/the-f2e-w9-note-app' : '',
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-svg-inline-loader')
      .loader('vue-svg-inline-loader')
      .options({ /* ... */ })
  }
}
