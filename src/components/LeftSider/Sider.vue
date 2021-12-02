<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { options } from './const';
import { useMessage } from 'naive-ui';

const store = useStore();
const message = useMessage();
const handleAddClick = (value: string) => {
  if (value !== null) {
    store.commit('add', {
      value: value,
      label: options.find(item => item.value === value)!.label,
    });
    message.success('添加成功');
  }
};
</script>

<template>
  <n-space vertical>
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
