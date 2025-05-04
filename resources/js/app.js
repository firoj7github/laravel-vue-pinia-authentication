import './bootstrap';
import { createApp } from 'vue';
import App from './App.vue';
import{ createPinia} from 'pinia';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');
