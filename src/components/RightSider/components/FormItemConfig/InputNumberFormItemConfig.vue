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
    <n-form-item label="是否可清空">
      <n-radio-group v-model:value="formValue.clearable">
        <n-space>
          <n-radio :key="0" :value="true">是</n-radio>
          <n-radio :key="1" :value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="最大值">
      <n-input-number v-model:value="formValue.max" placeholder="请输入最大值" />
    </n-form-item>
    <n-form-item label="最小值">
      <n-input-number v-model:value="formValue.min" placeholder="请输入最小值" />
    </n-form-item>
    <n-form-item label="每次改变步数，可以为小数">
      <n-input-number v-model:value="formValue.step" placeholder="请输入每次改变步数" />
    </n-form-item>
    <n-form-item label="是否有按钮">
      <n-radio-group v-model:value="formValue.showButton">
        <n-space>
          <n-radio :key="0" :value="true">是</n-radio>
          <n-radio :key="1" :value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="输入框尺寸">
      <n-radio-group v-model:value="formValue.size">
        <n-space>
          <n-radio :key="0" value="small">small</n-radio>
          <n-radio :key="1" value="medium">medium</n-radio>
          <n-radio :key="2" value="large">large</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
  </n-form>
</template>
<style></style>
