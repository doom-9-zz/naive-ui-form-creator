<script setup lang="ts">
import { useConfig } from '../../../../utils/hook/useConfig';
import { ruleOptions } from '../../../../const/const';
import { inject } from 'vue';
import { appProvideKey } from '../../../../const/const';

const formValue = useConfig({});
const appProvideConfig = inject(appProvideKey);
</script>

<template>
  <n-form>
    <n-form-item :label="$t('id', appProvideConfig?.local.value)">
      <n-input v-model:value="formValue.name" type="text" />
    </n-form-item>
    <n-form-item :label="$t('name', appProvideConfig?.local.value)">
      <n-input v-model:value="formValue.label" type="text" />
    </n-form-item>
    <n-form-item :label="$t('rules', appProvideConfig?.local.value)">
      <n-select v-model:value="formValue.rules" multiple :options="ruleOptions" />
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
