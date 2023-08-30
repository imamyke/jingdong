import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/Home.vue'
// import Login from '../views/login/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    beforeEnter (to, from, next) { // 只有訪問 Login 之前 才會執行
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/Register.vue'),
    beforeEnter (to, from, next) { // 只有訪問 Register 之前 才會執行
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/shop/:shopId',
    name: 'Shop',
    component: () => import('../views/shop/Shop.vue')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import('../views/cartList/CartList.vue')
  },
  {
    path: '/orderlist',
    name: 'OrderList',
    component: () => import('../views/orderList/OrderList.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about/About.vue')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import('../views/orderConfirmation/OrderConfirmation.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/search/Search.vue')
  },
  {
    path: '/searchList',
    name: 'SearchList',
    component: () => import('../views/searchList/SearchList.vue')
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/address/Address.vue')
  },
  {
    path: '/addressEdit',
    name: 'AddressEdit',
    component: () => import('../views/addressEdit/AddressEdit.vue')
  },
  {
    path: '/addressSelect',
    name: 'AddressSelect',
    component: () => import('../views/addressSelect/AddressSelect.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 執行路由之前
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register')
  isLogin || isLoginOrRegister ? next() : next({ name: 'Login' })
  console.log(to)
})

export default router
