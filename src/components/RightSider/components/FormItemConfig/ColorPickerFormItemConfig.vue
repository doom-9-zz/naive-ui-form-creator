<script setup lang="ts">
import { useConfig } from '../../../../utils/hook/useConfig';

const formValue = useConfig();
</script>

<template>
  <n-form>
    <n-form-item label="字段标识">
      <n-input v-model:value="formValue.name" type="text" placeholder="请输入字段标识" />
    </n-form-item>
    <n-form-item label="字段名称">
      <n-input v-model:value="formValue.label" type="text" placeholder="请输入字段名称" />
    </n-form-item>
    <n-form-item label="颜色选择器的尺寸">
      <n-radio-group v-model:value="formValue.size">
        <n-space>
          <n-radio :key="0" value="small">small</n-radio>
          <n-radio :key="1" value="medium">medium</n-radio>
          <n-radio :key="2" value="large">large</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="是否可调节 alpha 通道">
      <n-radio-group v-model:value="formValue.showAlpha">
        <n-space>
          <n-radio :key="0" :value="true">是</n-radio>
          <n-radio :key="1" :value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="颜色选择器支持颜色的格式">
      <n-select
        v-model:value="formValue.modes"
        multiple
        :options="[
          {
            label: 'rgb',
            value: 'rgb',
          },
          {
            label: 'hex',
            value: 'hex',
          },
          {
            label: 'hsl',
            value: 'hsl',
          },
          {
            label: 'hsv',
            value: 'hsv',
          },
        ]"
      />
    </n-form-item>
    <n-form-item label="显示按钮">
      <n-select
        v-model:value="formValue.actions"
        multiple
        :options="[
          {
            label: 'confirm',
            value: 'confirm',
          },
        ]"
      />
    </n-form-item>
  </n-form>
</template>
<style></style>
