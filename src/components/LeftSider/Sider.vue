<script setup lang="ts">
import { useStore } from 'vuex';
import { options } from '../../const/const';
import { useMessage } from 'naive-ui';

const store = useStore();
window.$message = useMessage();
const handleAddClick = (value: string) => {
  store.commit('add', {
    value: value,
    label: options.find(item => item.value === value)!.label,
  });
};
</script>

<template>
  <n-space vertical>
    <n-divider title-placement="left">添加表单项</n-divider>
    <n-button
      type="primary"
      v-for="item in options"
      size="large"
      @click="handleAddClick(item.value)"
    >
      {{ item.label }}
    </n-button>
  </n-space>
</template>

<style></style>
