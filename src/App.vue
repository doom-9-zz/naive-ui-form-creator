<script setup lang="ts">
import { ref, provide, computed } from 'vue';
import Layout from './components/Layout/Layout.vue';
import { darkTheme } from 'naive-ui';
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { zhCN, dateZhCN } from 'naive-ui';
import { appProvideKey } from './const/const';

hljs.registerLanguage('javascript', javascript);
const theme = ref<null | BuiltInGlobalTheme>(null);
const locale = ref<any>(null);
const dateLocale = ref<any>(null);

const changeTheme = () => {
  if (theme.value === null) {
    theme.value = darkTheme;
  } else {
    theme.value = null;
  }
};
const changeLocale = () => {
  if (locale.value === null) {
    locale.value = zhCN;
    dateLocale.value = dateZhCN;
  } else {
    locale.value = null;
    dateLocale.value = null;
  }
};

provide(appProvideKey, {
  local: computed(() => {
    return locale.value === null ? 'zh' : 'en';
  }),
});
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
