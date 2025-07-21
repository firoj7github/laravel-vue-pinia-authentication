import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Accept'] = 'application/json';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    error: null,
    success: null,
  }),

  actions: {
    async login(email, password) {
      try {
        const res = await axios.post('/api/login', { email, password });
        this.token = res.data.token;
        this.user = res.data.user;

        localStorage.setItem('token', this.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        this.error = null;
      } catch (err) {
        this.token = null;
        this.user = null;
        if (err.response && err.response.status === 422) {
          this.error = err.response.data.errors || {};
        } else {
          this.error = {
            general: [err.response?.data?.message || 'Login failed'],
          };
        }
      }
    },

    

    async getUser() {
      try {
        const res = await axios.get('/api/user');
        this.user = res.data;
      } catch (err) {
        this.user = null;
        console.error('User fetch failed:', err);
        // Optional: auto-logout on invalid token
        if (err.response?.status === 401) {
          this.logout();
        }
      }
    },

    async profileUpdate (data){
      try{
        const res = await axios.put('/api/auth/profile/update', data);
        console.log(res);
        this.user = res.data.user;
      }catch(err){
        this.error = err.response?.data || "Update failed";
      }
      

    },

    init() {
      if (this.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        this.getUser();
      }
    },

    async logout() {
      try {
        await axios.post('/api/logout');
      } catch (err) {
        console.error('Logout request failed:', err);
      }
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }
});
