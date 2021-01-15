import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const cart = () => import('views/cart/cart.vue')
const category = () => import('views/category/category.vue')
const home = () => import('views/home/home.vue')
const profile = () => import('views/profile/profile.vue')

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:home
  },
  {
    path:'/category',
    component:category
  },
  {
    path:'/cart',
    component:cart
  },
  {
    path:'/profile',
    component:profile
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
















// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
}


export default router
