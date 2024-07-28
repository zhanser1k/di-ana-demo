import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/auth/sign_in'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth/sign_in',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
