<script setup lang="ts">
import { useStore } from 'vuex';
import { options, LayoutOptions } from '../../const/const';
import { useMessage } from 'naive-ui';

const store = useStore();
window.$message = useMessage();
const handleAddClick = (value: string) => {
  store.commit('add', {
    value: value,
    label: options.find(item => item.value === value)!.label,
  });
};
const handleLayoutAddClick = (value: string) => {
  store.commit('add', {
    value: value,
    label: LayoutOptions.find(item => item.value === value)!.label,
  });
};
</script>

<template>
  <n-space vertical>
    <n-divider title-placement="left">添加表单项</n-divider>
    <n-divider title-placement="center">表单组件</n-divider>
    <n-button
      type="primary"
      v-for="item in options"
      size="large"
      @click="handleAddClick(item.value)"
    >
      {{ item.label }}
    </n-button>
    <n-divider title-placement="center">辅助组件</n-divider>
    <n-button
      type="warning"
      v-for="item in LayoutOptions"
      size="large"
      @click="handleLayoutAddClick(item.value)"
    >
      {{ item.label }}
    </n-button>
  </n-space>
</template>

<style></style>
