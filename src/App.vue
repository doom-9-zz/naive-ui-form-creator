<script setup lang="ts">
import { ref } from 'vue';
import Layout from './components/Layout/Layout.vue';
import { darkTheme } from 'naive-ui';
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface';
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
  <n-config-provider :theme="theme">
    <n-message-provider>
      <Layout @changeTheme="changeTheme" :isDark="theme === null ? false : true" />
    </n-message-provider>
  </n-config-provider>
</template>

<style></style>
