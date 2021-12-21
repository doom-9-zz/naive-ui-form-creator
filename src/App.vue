<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import Layout from './components/Layout/Layout.vue';
import { darkTheme, NLocale, NDateLocale } from 'naive-ui';
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { zhCN, dateZhCN } from 'naive-ui';
import { changeLocal } from 'vue3-i18n-plugin';

hljs.registerLanguage('javascript', javascript);
const theme = ref<null | BuiltInGlobalTheme>(null);
const locale = ref<null | NLocale>(zhCN);
const dateLocale = ref<null | NDateLocale>(dateZhCN);

const changeTheme = () => {
  if (theme.value === null) {
    theme.value = darkTheme;
  } else {
    theme.value = null;
  }
};

const store = useStore();
const changeLocale = () => {
  if (locale.value === null) {
    locale.value = zhCN;
    dateLocale.value = dateZhCN;
    store.commit('changeLocal', 'zh');
    changeLocal('zh');
  } else {
    locale.value = null;
    dateLocale.value = null;
    store.commit('changeLocal', 'en');
    changeLocal('en');
  }
};
</script>

<template>
  <n-config-provider :theme="theme" :hljs="hljs" :locale="locale" :date-locale="dateLocale">
    <n-message-provider :max="3">
      <Layout
        @changeTheme="changeTheme"
        @changeLocale="changeLocale"
        :isDark="theme === null ? false : true"
        :isEnglish="locale === null ? true : false"
      />
    </n-message-provider>
  </n-config-provider>
</template>

<style>
pre {
  overflow: auto;
}
</style>
