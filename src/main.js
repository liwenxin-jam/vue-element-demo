import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// a modern alternative to CSS resets
import "normalize.css/normalize.css";
import '@scss/global.scss';
// 全局引入element-ui 参考资料官网 https://element.eleme.cn/#/zh-CN/component/quickstart
import Element from "element-ui";
import "@scss/element-variables.scss";
Vue.use(Element);

import components from '@utils/component';
// 注册全局的组件
Object.keys(components).forEach((key) => {
  Vue.component(key, components[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");