// 配置参考资料 https://router.vuejs.org/zh/
import Vue from "vue";
import Router from "vue-router";

/* Layout */
import Layout from '@/layout'

Vue.use(Router);

// 公共的异步加载组件方法
const syncImportComponent = path => {
  const asyncComponent = () => {
    let component =
      import ( /* webpackChunkName: "view-[request]" */ `@/views/${path}`);
    component.catch(e => {
      console.log("加载错误");
      console.error(e);
    });
    return component;
  };
  return asyncComponent;
};

export const constantRoutes = [{
    path: "/",
    redirect: "/home"
  },
  {
    path: "/login",
    component: syncImportComponent("login"),
    name: 'Lome',
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'home',
      component: syncImportComponent("home"),
      name: 'Home',
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }]
  },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

export default router;