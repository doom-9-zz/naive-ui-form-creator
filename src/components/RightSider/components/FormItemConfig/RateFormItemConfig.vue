<script setup lang="ts">
import { useConfig } from '../../../../utils/hook/useConfig';

const formValue = useConfig({
  label: undefined,
  name: undefined,
  size: 'medium',
  count: 5,
  allowHalf: false,
});
</script>

<template>
  <n-form>
    <n-form-item label="字段标识">
      <n-input v-model:value="formValue.name" type="text" placeholder="请输入字段标识" />
    </n-form-item>
    <n-form-item label="字段名称">
      <n-input v-model:value="formValue.label" type="text" placeholder="请输入字段名称" />
    </n-form-item>
    <n-form-item label="图标尺寸">
      <n-radio-group v-model:value="formValue.size">
        <n-space>
          <n-radio :key="0" value="small">small</n-radio>
          <n-radio :key="1" value="medium">medium</n-radio>
          <n-radio :key="2" value="large">large</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="图标个数">
      <n-input-number v-model:value="formValue.count" placeholder="请输入图标个数" />
    </n-form-item>
    <n-form-item label="允许只激活一半图标">
      <n-radio-group v-model:value="formValue.allowHalf">
        <n-space>
          <n-radio :key="0" :value="true">是</n-radio>
          <n-radio :key="1" :value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
  </n-form>
</template>
<style></style>
