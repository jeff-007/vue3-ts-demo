import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    redirect: '/home'
    // component: () => import(/* webpackChunkName: "about" */ '../views/HomeNew.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/form',
    name: 'form',
    component: () => import(/* webpackChunkName: "about" */ '../views/FormView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeNew.vue'),
    children: [
      {
        path: 'user',
        name: 'user',
        meta: {
          isShow: true,
          title: '用户列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      },
      {
        path: 'goods',
        name: 'goods',
        meta: {
          isShow: true,
          title: '商品列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/FormView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
