import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router';
import i18n from './i18n'

// Crear la instancia de Pinia
const pinia = createPinia();

// Crear la instancia de la aplicación
const app = createApp(App);
app.use(i18n); // Agregar i18n a la aplicación
app.use(pinia); // Agregar Pinia a la aplicación
app.use(router); // Agregar router a la aplicación
app.mount('#app'); // Montar la aplicación en el elemento con el ID "app"
 
