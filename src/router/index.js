import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
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
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (isLoggedIn) {
    if (to.path === '/auth/sign_in') {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    if (to.path !== '/auth/sign_in') {
      next({ path: '/auth/sign_in' });
    } else {
      next();
    }
  }
});


export default router
