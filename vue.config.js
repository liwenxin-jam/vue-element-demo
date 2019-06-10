// 配置参考资料
// vue-cli3: https://cli.vuejs.org/zh/config/
// webpack4 https://webpack.js.org/configuration/devtool
const path = require("path");
const resolve = dir => path.join(__dirname, dir);

const isProduction = process.env.NODE_ENV === "production";
const cdn = {
  css: [],
  js: [
    "https://cdn.bootcss.com/vue/2.6.6/vue.runtime.min.js",
    "https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js",
    "https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js",
    "https://cdn.bootcss.com/axios/0.18.0/axios.min.js"
  ]
};

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  // 生产环境是否生成 sourceMap 文件，打包时不生成.map文件
  productionSourceMap: false,
  // webpack配置
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@components", resolve("src/components"))
      .set("@scss", resolve("src/assets/styles"))
      .set("@img", resolve("src/assets/images"))
      .set("@api", resolve("src/api"))
      .set("@utils", resolve("src/utils"));
    // 生产环境配置
    if (isProduction) {
      // 删除预加载
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
      // 压缩代码
      config.optimization.minimize(true);
      // 分割代码
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk("single");
      // 生产环境注入cdn
      config.plugin("html").tap(args => {
        args[0].cdn = cdn;
        return args;
      });
    } else {
      config => config.devtool("cheap-source-map");
    }
  },
  // 扩展webpack
  configureWebpack: config => {
    if (isProduction) {
      // 用cdn方式引入
      config.externals = {
        vue: "Vue",
        vuex: "Vuex",
        "vue-router": "VueRouter",
        axios: "axios"
      };
    } else {
      // 为开发环境修改配置...
    }
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
    },
    // 模拟返回接口
    before(app) {
      app.get("/user/login", function(req, res) {
        res.json({
          token:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU1OTkxMTQ2NX0.nDoWwceR0UwIrodiG2J50AJok4yCrb_WVdaiJhtXc_5UcQDarGzOifYJVKT6aEgKXZE-3FrcDs3bvqbsTCtM2A"
        });
      });
      app.get("/user/info", function(req, res) {
        res.json({
          info: {
            name: "admin",
            avatar:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532234362698&di=5d4a5555cdf01c57174f68270516fe5e&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2Faf350d6710b8d2c3.jpg",
            roles: ["admin"]
          }
        });
      });
      app.post("/user/logout", function(req, res) {
        res.json({
          data: {}
        });
      });
    }
  }
};
