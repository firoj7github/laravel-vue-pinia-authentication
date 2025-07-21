import { createRouter, createWebHistory } from "vue-router";
import Login from '../pages/Login.vue';
import Profile from '../pages/Profile.vue';
import { useAuthStore } from '../stores/auth'; // Import auth store

const routes = [
  {
  path: '/login',
  component: Login,
  beforeEnter: (to, from, next) => {
    const auth = useAuthStore();
    if (auth.token) {
      next('/profile'); // যদি লগিন থাকে, প্রোফাইলে পাঠাও
    } else {
      next(); // লগিন না থাকলে লগিন পেজ দেখাও
    }
  }
},
{
  path: '/profile',
  component: Profile,
  beforeEnter: (to, from, next) => {
    const auth = useAuthStore();
    if (!auth.token) {
      next('/login'); // লগিন না থাকলে লগিন পেজে পাঠাও
    } else {
      next(); // লগিন থাকলে প্রোফাইল দেখাও
    }
  }
}

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
