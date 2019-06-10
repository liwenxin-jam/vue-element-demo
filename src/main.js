import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets
import "@scss/global.scss"; // global css
// 引入iconfont字体库 https://www.iconfont.cn，也可以用http://fontawesome.dashgame.com/
require("@/assets/fonts/iconfont");
import "./permission"; // permission control

// UI框架 https://element.eleme.io/#/zh-CN/component/quickstart
import Element from "element-ui";
import "@scss/element-variables.scss";
Vue.use(Element);

// 注册全局的组件
import components from "@utils/component";
Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});

// 在开发模式下开启提示
const isdev = process.env.NODE_ENV !== "production";
Vue.config.devtools = isdev;
Vue.config.productionTip = isdev;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
