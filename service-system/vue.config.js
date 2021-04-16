module.exports = {
  // webpack-dev-server 相关配置
  devServer: {
    open: true, //配置自动启动浏览器
    host: "0.0.0.0",
    port: 8175, // 前端项目启动端口号
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      "/lsf": {
        target: "http://www.kabos.cn/", //配置开发环境跨域请求服务地址
        changeOrigin: true, //改变源
        //ws: true, //是否代理websockets
        pathRewrite: {
          "^/lsf": "",
        },
      },
    },
    before: (app) => {},
  },
};
