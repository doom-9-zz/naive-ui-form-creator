<script lang="ts" setup>
import { ref } from 'vue';
const labelPlacement = ref('left');
const labelAlign = ref('');
const labelWidth = ref('80');
const requiredFlag = ref(true);
</script>
<template>
  <n-divider title-placement="left">配置</n-divider>
  <n-tabs type="segment">
    <n-tab-pane name="oasis" tab="表单项配置">Wonderwall</n-tab-pane>
    <n-tab-pane name="the beatles" tab="表单配置">
      <n-form-item label="标签位置">
        <n-radio-group v-model:value="labelPlacement">
          <n-space>
            <n-radio key="left" value="left">left</n-radio>
            <n-radio key="top" value="top">top</n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="标签宽度">
        <n-input v-model:value="labelWidth" type="text" placeholder="请输入标签宽度" />
      </n-form-item>
      <n-form-item label="是否显示必填标志">
        <n-switch v-model:value="requiredFlag" />
      </n-form-item>
      <n-form-item label="标签对其方式">
        <n-radio-group v-model:value="labelAlign">
          <n-space>
            <n-radio key="left" value="left">left</n-radio>
            <n-radio key="right" value="right">right</n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
    </n-tab-pane>
  </n-tabs>
</template>
<style></style>
