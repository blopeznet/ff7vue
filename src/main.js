import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router';
import i18n from './i18n'
import '../public/styles/app.css'; // importa tu archivo de estilos de transición


const pinia = createPinia();
const app = createApp(App);
app.use(i18n); 
app.use(pinia); 
app.use(router); 
app.mount('#app'); 
 
