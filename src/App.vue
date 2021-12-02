<script setup lang="ts">
import { ref } from 'vue';
import Layout from './components/Layout.vue';
import { darkTheme } from 'naive-ui';
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface';
const theme = ref<null | BuiltInGlobalTheme>(null);

const goDark = () => {
  theme.value = darkTheme;
};
</script>

<template>
  <n-config-provider :theme="theme"><Layout @goDark="goDark" /></n-config-provider>
</template>

<style></style>
