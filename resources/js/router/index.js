import { createRouter, createWebHistory } from "vue-router";
import Login from '../pages/Login.vue';
import Profile from '../pages/Profile.vue';
import { useAuthStore } from '../stores/auth'; // Import auth store

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore(); // Access auth store
      if (!auth.token) {
        next('/login'); // If not authenticated, redirect to login page
      } else {
        next(); // Otherwise, proceed to the profile page
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
