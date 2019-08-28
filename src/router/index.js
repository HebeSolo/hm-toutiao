// 创建一个router实例导出给main.js使用
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'
import Welcome from '../views/welcome'
import NotFound from '../views/404'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  // 写路由规则 name给当前路由取名称 将来可以跳转使用
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/',
      component: Home,
      children: [
        // 欢迎页面 如果子路由有名字 父路由需要删除
        { path: '/', name: 'welcome', component: Welcome }
      ]
    },
    // 执行过所有路由之后,没有符合的路由,则显示这个路由的页面
    { path: '*', name: '404', component: NotFound }

  ]
})
// 前置守卫
router.beforeEach((to, from, next) => {
  const user = store.getUser()
  console.log(user)
  // 访问的是登录页面:放行
  // 访问的是其他页面且没有做过登录:拦截
  // if (to.path === '/login') return next()
  // if (!user.token) return next('/login')
  // next()
  if (to.path !== '/login' && !user.token) return next('/login')
  next()
})
// 导出router
export default router
