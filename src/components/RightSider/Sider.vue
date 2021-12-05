<script lang="ts" setup>
import FormConfig from './components/FormConfig/FormConfig.vue';
import FormItemConfig from './components/FormItemConfig/FormItemConfig.vue';
</script>
<template>
  <n-divider title-placement="left">配置</n-divider>
  <n-tabs type="segment">
    <n-tab-pane name="oasis" tab="表单项配置">
      <FormItemConfig />
    </n-tab-pane>
    <n-tab-pane name="the beatles" tab="表单配置">
      <FormConfig />
    </n-tab-pane>
  </n-tabs>
</template>
<style></style>
