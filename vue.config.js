// 配置参考资料 https://cli.vuejs.org/zh/config/
const webpack = require("webpack");
const path = require("path");
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  // 生产环境是否生成 sourceMap 文件，打包时不生成.map文件
  productionSourceMap: false,
  // 扩展webpack
  configureWebpack: {
    devServer: {
      before(app) {
        app.get('/user/login', function(req, res) {
          res.json({
            token: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU1OTkxMTQ2NX0.nDoWwceR0UwIrodiG2J50AJok4yCrb_WVdaiJhtXc_5UcQDarGzOifYJVKT6aEgKXZE-3FrcDs3bvqbsTCtM2A'
          });
        });
        app.get('/user/info', function(req, res) {
          res.json({
            data: { "name": "admin", avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532234362698&di=5d4a5555cdf01c57174f68270516fe5e&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2Faf350d6710b8d2c3.jpg", "roles": [{ "id": 1, "name": "admin", "cname": "超级管理员" }] }
          });
        });
      }
    }
  },
  // webpack配置
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@components", resolve("src/components"))
      .set("@scss", resolve("src/assets/styles"))
      .set("@img", resolve("src/assets/images"))
      .set("@api", resolve("src/api"))
      .set("@utils", resolve("src/utils"));
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // 引入全局变量样式
        data: `
          @import '@scss/variables.scss';
          @import '@scss/mixin.scss';
        `
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // 跨域配置
  devServer: {
    port: 9526,
    open: false, // 自动开启浏览器
    compress: true, // 开启压缩
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/mock": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/mock": ""
        }
      }
    }
  }
};