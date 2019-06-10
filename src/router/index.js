// 参考资料 https://router.vuejs.org/zh/
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 公共的异步加载组件
const syncImportComponent = (path) => {
  const asyncComponent = () => {
    let component = import( /* webpackChunkName: "view-[request]" */ `@/views/${path}`);
    component.catch((e) => {
      console.log('加载错误')
      console.error(e);
    });
    return component;
  };
  return asyncComponent;
};

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () =>
      import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      component: syncImportComponent('home'),
      name: 'Home',
      meta: { title: '首页', icon: 'dashboard', affix: true },
      hidden: true
    }]
  },
  { name: '404', path: '/404', component: syncImportComponent('404'), hidden: true },
  {
    path: '/test1',
    component: Layout,
    children: [{
      path: 'index',
      component: syncImportComponent('test1'),
      name: 'Test1',
      meta: { title: '测试页面1', icon: 'tab' }
    }]
  },
  {
    path: '/parent',
    component: Layout,
    redirect: '/parent/page1',
    alwaysShow: true, // will always show the root menu
    name: 'Parent',
    // you can set roles in root nav, if do not set roles, means: this page does not require permission
    // roles: ['admin', 'editor']
    meta: { title: '有子级的页面', icon: 'list' },
    children: [{
        path: 'page1',
        component: () => import('@/views/parent/children/page1/index'),
        name: 'Page1',
        // or you can only set roles in sub nav
        meta: { title: '子级页面1', icon: 'nested' }
      },
      {
        path: 'page2',
        component: () => import('@/views/parent/children/page2/index'),
        name: 'Page2',
        meta: { title: '子级页面2', icon: 'tree' }
      },
      {
        path: 'page3',
        component: () => import('@/views/parent/children/page3/index'),
        name: 'Page3',
        meta: { title: '子级页面3', icon: 'table' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true }
];

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