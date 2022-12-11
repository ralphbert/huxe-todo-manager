import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import { useAuthStore } from '@/stores/auth-store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        public: true,
      },
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue'),
      meta: {
        public: false,
      },
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
  ],
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  if (auth.isAuthenticated && to.meta.public === true) {
    return { name: 'dashboard' };
  } else if (!auth.isAuthenticated && !to.meta?.public) {
    return { name: 'login' };
  }
});

export default router;
