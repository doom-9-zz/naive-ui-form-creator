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
    <n-form-item :label="$t('size', appProvideConfig?.local.value)">
      <n-radio-group v-model:value="formValue.size">
        <n-space>
          <n-radio :key="0" value="small">small</n-radio>
          <n-radio :key="1" value="medium">medium</n-radio>
          <n-radio :key="2" value="large">large</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('count', appProvideConfig?.local.value)">
      <n-input-number v-model:value="formValue.count" />
    </n-form-item>
    <n-form-item :label="$t('allowHalf', appProvideConfig?.local.value)">
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
