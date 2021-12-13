import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { loadFonts } from './plugins/webfontloader';
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import './assets/tailwind.css'

loadFonts();

createApp(App).use(Quasar, quasarUserOptions).use(router).mount('#app');
