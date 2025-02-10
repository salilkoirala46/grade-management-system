import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '../supabase/client';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      component: () => import('../views/Register.vue'),
      meta: { requiresAuth: false }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !session) {
    next('/login');
  } else if (!requiresAuth && session) {
    next('/');
  } else {
    next();
  }
});

export default router;