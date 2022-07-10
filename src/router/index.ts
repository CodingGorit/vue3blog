import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue';
import { useState } from '@/store';

const store = useState();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/posts/new',
    name: 'NewPost',
    component: () => import('../views/NewPost.vue'),
    // 添加博客进行权限控制，添加 meta 属性
    meta: { 
      requireAuth: true // 自定义属性，跳转到该页可以获取该属性
    },
  }, {
    path: "/posts/:id",
    name: 'ShowPost',
    component: () => import("../views/ShowPost.vue"),
  }, {
    path: "/posts/:id/edit",
    name: 'EditPost',
    component: () => import("../views/EditPost.vue"),
    meta: { 
      requireAuth: true // 自定义属性，跳转到该页可以获取该属性
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/**
 * 路由守卫
 * @param to 要跳转的，from 来自哪个组件， next 下一步动作
 */
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !store.getState().loginUser.currentUserId) {
    next({
      // 未登录，不能操作。 项目有 BUG， bulma 的 modal 属性无效
      name: 'Home'
    })
  } else {
    next();
  }
})

export default router
