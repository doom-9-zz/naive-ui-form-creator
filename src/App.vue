<script setup lang="ts">
import { ref } from 'vue';
import Layout from './components/Layout/Layout.vue';
import { darkTheme } from 'naive-ui';
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);
const theme = ref<null | BuiltInGlobalTheme>(null);

const changeTheme = () => {
  if (theme.value === null) {
    theme.value = darkTheme;
  } else {
    theme.value = null;
  }
};
</script>

<template>
  <n-config-provider :theme="theme" :hljs="hljs">
    <n-message-provider :max="3">
      <Layout @changeTheme="changeTheme" :isDark="theme === null ? false : true" />
    </n-message-provider>
  </n-config-provider>
</template>

<style>
pre {
  overflow: auto;
}
</style>
