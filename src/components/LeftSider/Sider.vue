<script setup lang="ts">
import { useStore } from 'vuex';
import { options } from './const';
import { useMessage } from 'naive-ui';
import { v4 as uuidv4 } from 'uuid';

const store = useStore();
const message = useMessage();
const handleAddClick = (value: string) => {
  if (value !== null) {
    store.commit('add', {
      id: uuidv4(),
      value: value,
      label: options.find(item => item.value === value)!.label,
    });
    message.success('添加成功');
  }
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
