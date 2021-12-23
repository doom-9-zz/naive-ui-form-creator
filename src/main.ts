import App from './App.vue';
import { createApp } from 'vue';
import naive from 'naive-ui';
import { store } from './store/index';
import i18n from 'vue3-i18n-plugin';
import i18nConfig from './utils/i18n/const';

createApp(App)
  .use(store)
  .use(naive)
  .use(i18n, {
    initial: 'zh',
    translationConfiguration: i18nConfig,
  })
  .mount('#app');
