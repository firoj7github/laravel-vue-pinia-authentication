import './bootstrap';
import { createApp } from 'vue';
import App from './App.vue';
import{ createPinia} from 'pinia';
import router from './router';
import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(Toast, {
    timeout: 3000,
    position: 'top-right',
    closeOnClick: true,
  });
app.mount('#app');
