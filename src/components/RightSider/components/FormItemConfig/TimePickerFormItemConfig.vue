<script setup lang="ts">
import { useConfig } from '../../../../utils/hook/useConfig';
import { ruleOptions } from '../../../../const/const';

const formValue = useConfig({});
</script>

<template>
  <n-form>
    <n-form-item label="字段标识">
      <n-input v-model:value="formValue.name" type="text" placeholder="请输入字段标识" />
    </n-form-item>
    <n-form-item label="字段名称">
      <n-input v-model:value="formValue.label" type="text" placeholder="请输入字段名称" />
    </n-form-item>
    <n-form-item label="校验规则">
      <n-select v-model:value="formValue.rules" multiple :options="ruleOptions" />
    </n-form-item>
    <n-form-item label="时间格式化字符串">
      <n-input v-model:value="formValue.format" type="text" placeholder="请输入时间格式化字符串" />
    </n-form-item>
    <n-form-item label="Time Picker 中支持的操作">
      <n-select
        v-model:value="formValue.actions"
        multiple
        :options="[
          {
            label: 'now',
            value: 'now',
          },
          {
            label: 'confirm',
            value: 'confirm',
          },
        ]"
      />
    </n-form-item>
    <n-form-item label="是否可清空">
      <n-radio-group v-model:value="formValue.clearable">
        <n-space>
          <n-radio :key="0" :value="true">是</n-radio>
          <n-radio :key="1" :value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="选择框的尺寸">
      <n-radio-group v-model:value="formValue.size">
        <n-space>
          <n-radio :key="0" value="small">small</n-radio>
          <n-radio :key="1" value="medium">medium</n-radio>
          <n-radio :key="2" value="large">large</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="选择框的占位符">
      <n-input
        v-model:value="formValue.placeholder"
        type="text"
        placeholder="请输入选择框的占位符"
      />
    </n-form-item>
    <n-form-item label="是否使用 12 小时制的面板">
      <n-radio-group v-model:value="formValue.use12Hours">
        <n-space>
          <n-radio :key="0" :value="true">是</n-radio>
          <n-radio :key="1" :value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
  </n-form>
</template>
<style></style>
