// stores/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Accept'] = 'application/json';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    error: null
  }),

  actions: {
    async login(email, password) {
      try {
        const res = await axios.post('/api/login', { email, password });
        // console.log(res);
        this.token = res.data.access_token;
        this.user = res.data.user;
        this.error = null;

        localStorage.setItem('token', this.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      } catch (err) {
        console.log(err.response);
        if(err.response && err.response.status === 422){
          this.error = err.response.data.errors || {};
        }else{
          this.error = {
            general: [err.response?.data?.message || 'Login failed'],
          };
        }
        this.token = null;
        this.user = null;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }
});
