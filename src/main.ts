import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import { useAuthStore } from './stores/auth';
import './style.css';
import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(PrimeVue);
const authStore = useAuthStore();
authStore.initializeAuth().then(() => {
    app.mount('#app')
})