<script setup lang="ts">
import { inject } from 'vue';
import { useStore } from 'vuex';
import { options, LayoutOptions, appProvideKey } from '../../const/const';
import { useMessage } from 'naive-ui';

const store = useStore();
window.$message = useMessage();
const handleAddClick = (value: string) => {
  store.commit('add', {
    value: value,
  });
};
const handleLayoutAddClick = (value: string) => {
  store.commit('add', {
    value: value,
  });
};

const appProvideConfig = inject(appProvideKey);
</script>

<template>
  <n-space vertical>
    <n-divider title-placement="center">
      {{ $t('formComponent', appProvideConfig?.local.value) }}
    </n-divider>
    <n-button
      type="primary"
      v-for="item in options"
      size="large"
      @click="handleAddClick(item.value)"
    >
      {{ $t(item.formItemConfig.label, appProvideConfig?.local.value) }}
    </n-button>
    <n-divider title-placement="center">
      {{ $t('layoutComponent', appProvideConfig?.local.value) }}
    </n-divider>
    <n-button
      type="warning"
      v-for="item in LayoutOptions"
      size="large"
      @click="handleLayoutAddClick(item.value)"
    >
      {{ $t(item.formItemConfig.label, appProvideConfig?.local.value) }}
    </n-button>
  </n-space>
</template>

<style></style>
