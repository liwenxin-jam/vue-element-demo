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
    path: '/login',
    component: () =>
      import ('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () =>
        import ('@/views/home/index'),
      name: 'Dashboard',
      meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
    }]
  },
  // {
  //   path: '/test',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: syncImportComponent("test"),
  //     name: 'test',
  //     meta: { title: 'test', icon: 'dashboard', affix: true, roles: ['admin'] }
  //   }]
  // }
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router