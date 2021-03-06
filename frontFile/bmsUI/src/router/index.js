import Vue from 'vue'
import Router from 'vue-router'
import Home from '@components/home/home.vue'
import BookInfo from '@components/bookInfo/bookInfo.vue'
import AppNotFound from '@components/notFound/notfound.vue'
import BorrowBooks from '@components/borrowBooks/borrowBooks.vue'
import BookManagement from '@components/booksManagement/booksMangement.vue'
import UserManagement from '@components/userManagement/userManagement.vue'
import BorrowManagement from '@components/borrowManagement/borrowManagement.vue'
import UserInfo from '@components/UserInfo/UserInfo.vue'
import Login from '@components/login/login.vue'
import store from '../store/index'

Vue.use(Router)

const router = new Router({
  mode: 'history', 
  routes: [
    { 
      path: '/', 
      redirect: { name: 'home' }
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/bookInfo',
      name: 'bookInfo',
      component: BookInfo
    },
    {
      path: '/borrowBooks',
      name: 'borrowBooks',
      component : BorrowBooks

    },
    {
      path: '/bookManagement',
      name: 'bookManagement',
      component : BookManagement
    },
    {
      path: '/userManagement',
      name: 'userManagement',
      component : UserManagement
    },
    {
      path: '/borrowManagement',
      name: 'borrowManagement',
      component : BorrowManagement
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component : UserInfo
    },
    {
      path:'/login',
      name:'login',
      component : Login
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: AppNotFound
    },
    {
        path: '**',
        redirect: '/not-found'
    }

  ]
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由


  const nextRoute = ['home','bookInfo',"/borrowBooks","/userManagement","/borrowManagement","/userInfo","/login","/not-found","/bookManagement"];
  
  let isLogin = store.state.User.isLogin;  // 是否登录
  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  if (nextRoute.indexOf(to.name) >= 0) {  
    if (isLogin== false) {
      router.push({ name: 'login' })
    }
  }
  // 已登录状态；当路由到login时，跳转至home 
  if (to.name === 'login') {
    if (isLogin== true) {
      router.push({ name: 'home' });
    }
  }
  next();
});


export default router;
