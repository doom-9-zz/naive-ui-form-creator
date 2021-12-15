<script setup lang="ts">
import { useConfig } from '../../../../utils/hook/useConfig';

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
      <n-select
        v-model:value="formValue.rules"
        multiple
        :options="[
          {
            label: '必填',
            value: '0',
          },
        ]"
      />
    </n-form-item>
    <n-form-item label="是否选择范围值">
      <n-radio-group v-model:value="formValue.range">
        <n-space>
          <n-radio :key="0" :value="true">是</n-radio>
          <n-radio :key="1" :value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="是否倒转轨道">
      <n-radio-group v-model:value="formValue.reverse">
        <n-space>
          <n-radio :key="0" :value="true">是</n-radio>
          <n-radio :key="1" :value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="是否启用垂直模式">
      <n-radio-group v-model:value="formValue.vertical">
        <n-space>
          <n-radio :key="0" :value="true">是</n-radio>
          <n-radio :key="1" :value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="是否展示 tooltip">
      <n-radio-group v-model:value="formValue.tooltip">
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
    <n-form-item label="步长">
      <n-input-number v-model:value="formValue.step" placeholder="请输入步长" />
    </n-form-item>
  </n-form>
</template>
<style></style>
