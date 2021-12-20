import App from './App.vue';
import { createApp } from 'vue';
import naive from 'naive-ui';
import { store } from './store/index';
import i18n from './utils/i18n/index';
import i18nConfig from './utils/i18n/const';

createApp(App).use(store).use(naive).use(i18n, i18nConfig).mount('#app');
