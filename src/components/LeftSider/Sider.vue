<script setup lang="ts">
import { ref } from 'vue';
import { options } from './const';
import { useMessage } from 'naive-ui';

const message = useMessage();
const value = ref<string | null>(null);
const handleAddClick = () => {
  message.warning(value.value === null ? '' : '添加成功');
};
</script>

<template>
  <n-space vertical>
    <n-select v-model:value="value" :options="options" placeholder="请选择要添加的表单项" />
    <n-button type="primary" @click="handleAddClick">添加</n-button>
  </n-space>
</template>

<style></style>
