module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:20202",
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      }
    }
  },
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule("md")
      .test(/\.md$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  }
};
