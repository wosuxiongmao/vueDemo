const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  productionSourceMap:false,
  // 关闭ESLINT校验工具
  lintOnSave: false,
  //配置代理跨域
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        pathRewrite: {'^/api':'/'} //如果后端的API都是以 api 开头，则不需要此行
      },
    },
  },
})
