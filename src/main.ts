import App from './App.vue';
import { createApp } from 'vue';
import naive from 'naive-ui';
import { store } from './store/index';

createApp(App).use(store).use(naive).mount('#app');
