import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@scss/global.scss' // global css
// 引入iconfont字体库
require('@/assets/fonts/iconfont');
import './permission' // permission control

import Element from 'element-ui'
import '@scss/element-variables.scss'
Vue.use(Element)

import components from '@utils/component';
console.log(components)
  // 注册全局的组件
Object.keys(components).forEach((key) => {
  Vue.component(key, components[key]);
});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})