# vue-element-demo

### 关于环境变量的注意事项
 * 环境名应该与环境文件统一，环境文件放置根目录下
 * 除了 baseUrl 和 NODE_ENV 其他环境变量使用 VUE_APP 开头
 * 另外还设定本地运行环境local,你可以在项目拉取下来后补充 .env.development.local 文件,并添加如下信息并替换你自己所在服务器的域名及端口;
 * 例如 :
 
```
 NODE_ENV='development'
 VUE_APP_URL='http://localhost:8080'
```
 
## Install dependencies node版本建议是LTS，例如8.11.3
```
npm install --registry=https://registry.npm.taobao.org
```

### 本地运行环境Compiles and hot-reloads for development 
```
npm run serve
```

### 编辑、压缩文件，打包给生产环境使用，默认npm run build对应的是根目录下的.env.production
```
npm run build
```

### 参考资料
 * 脚手架搭建工具[Vue-CLI](https://cli.vuejs.org/zh/)
 * 生命周期 data watch props methods相关[Vue](https://cn.vuejs.org/index.html)
 * 路由相关[Vue-Router](https://router.vuejs.org/zh/)
 * 状态管理[Vuex](https://vuex.vuejs.org/zh/)
 * 接口相关配置[axios](https://github.com/axios/axios)
 * UI框架[Element-UI](https://element.eleme.cn/#/zh-CN/component/collapse)
 * icon字体库[Font-Awesome](http://fontawesome.dashgame.com/)